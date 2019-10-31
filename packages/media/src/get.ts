import fastify from 'fastify'
import {ServerContext} from './context'
import {FileID} from './fileID'
import {peekContentType} from './utility'
import {PassThrough} from 'stream'
import pump from 'pump'
import {ErrorCode, MediaError} from './error'

export function getMediaMiddleware(context: ServerContext): fastify.RequestHandler {
  return async (req, res) => {
    const fileID = FileID.fromParams(
      req.params['id'],
      req.params['transformation'],
      req.params['filename']
    )

    if ((!context.debug || fileID.isOriginal) && (await context.storageBackend.exists(fileID))) {
      const fileStream = await context.storageBackend.read(fileID)
      const [mimeType, outputStream] = await peekContentType(fileStream)

      res.header('Content-Type', mimeType).status(200)
      return outputStream
    } else {
      const originalFileID = fileID.original()

      if (!(await context.storageBackend.exists(originalFileID))) {
        throw new MediaError(ErrorCode.NotFound, 'Image not found.')
      }

      const fileStream = await context.storageBackend.read(originalFileID)
      const transformedFileStream = await context.imageBackend.transform(fileID, fileStream)

      if (!transformedFileStream) {
        throw new MediaError(ErrorCode.InvalidImage, 'Invalid image.')
      }

      const writePassthrough = new PassThrough()
      const transformPassthrough = new PassThrough()

      // TODO: Check if this is problematic if streams don't get processed at the same rate
      pump([transformedFileStream, writePassthrough])
      pump([transformedFileStream, transformPassthrough])

      context.storageBackend.write(fileID, writePassthrough)
      const [mimeType, outputStream] = await peekContentType(transformPassthrough)

      res.header('Content-Type', mimeType).status(200)
      return outputStream
    }
  }
}
