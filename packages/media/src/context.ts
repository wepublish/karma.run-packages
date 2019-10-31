import {ImageBackend} from './imageBackend'
import {StorageBackend} from './storageBackend'
import fastify from 'fastify'

export interface ServerContext {
  hostname: string
  imageBackend: ImageBackend
  storageBackend: StorageBackend
  tempDirPath: string

  maxUploadSize: number

  debug: boolean
  tokens: {[key: string]: string}

  verifyToken(req: fastify.FastifyRequest): boolean
}
