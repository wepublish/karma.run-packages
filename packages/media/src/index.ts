import os from 'os'
import fs from 'fs'
import path from 'path'
import fastify, {FastifyRequest} from 'fastify'
import fastifyMultipart from 'fastify-multipart'

import {ImageBackend} from './imageBackend'
import {StorageBackend} from './storageBackend'
import {uploadMediaMiddleware} from './upload'
import {ServerContext} from './context'
import {getMediaMiddleware} from './get'
import {createErrorResponse, ErrorCode, MediaError, statusCodeForErrorCode} from './error'
import {deleteMediaMiddleware} from './delete'

export * from './storageBackend'
export * from './imageBackend'
export * from './fileID'
export * from './transformation'
export * from './error'

export interface ServerOptions {
  hostname?: string
  address?: string
  port?: number
  logger?: boolean
  debug?: boolean

  imageBackend: ImageBackend
  storageBackend: StorageBackend

  tempDirPath?: string
  maxUploadSize?: number
  token: string
}

export default async function startMediaServer(opts: ServerOptions): Promise<() => Promise<void>> {
  if (Object.keys(opts.token).length === 0) {
    console.warn('No "token" defined, you won\'t be able to upload or manage media.')
  }

  opts.logger = opts.logger || true

  const hostname = opts.hostname || ''
  const tempDirPath = opts.tempDirPath || path.join(os.tmpdir(), 'karma.run-media')
  const maxUploadSize = opts.maxUploadSize || 1024 * 1024 * 3
  const debug = opts.debug || false

  const context: ServerContext = {
    hostname,
    tempDirPath,
    maxUploadSize,
    debug,

    imageBackend: opts.imageBackend,
    storageBackend: opts.storageBackend,
    token: opts.token,

    verifyToken(req: FastifyRequest) {
      const [, token] = req.headers.authorization.match(/Bearer (.+?$)/i) || []
      return token === opts.token
    }
  }

  const server = fastify({
    logger: opts.logger ? {prettyPrint: true} : false,
    maxParamLength: 300
  })

  server.register(fastifyMultipart, {
    limits: {
      files: 1,
      fileSize: opts.maxUploadSize || maxUploadSize
    }
  })

  server.get('/favicon.ico', (_req, res) => {
    res.status(404).send()
    return
  })

  server.post('/', uploadMediaMiddleware(context))
  server.delete('/:id', deleteMediaMiddleware(context))

  server.get('/:id', getMediaMiddleware(context))
  server.get('/:id/:filename?', getMediaMiddleware(context))
  server.get('/:id/t/:transformation', getMediaMiddleware(context))
  server.get('/:id/t/:transformation/:filename?', getMediaMiddleware(context))

  server.setNotFoundHandler((_req, res) => {
    res.status(404).send(
      createErrorResponse({
        code: ErrorCode.NotFound,
        message: 'Not Found'
      })
    )
  })

  server.setErrorHandler((err, req, res) => {
    req.log.error(err)

    if (err instanceof MediaError) {
      res.status(statusCodeForErrorCode(err.code)).send(
        createErrorResponse({
          code: err.code,
          message: err.message,
          data: err.data
        })
      )
    } else {
      res.status(500).send(
        createErrorResponse({
          code: ErrorCode.Internal,
          message: 'Internal Error'
        })
      )
    }
  })

  await fs.promises.mkdir(tempDirPath, {recursive: true})
  await server.listen(opts.port || 3000, opts.address)

  return async () => await server.close()
}
