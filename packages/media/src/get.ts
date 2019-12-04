import fastify from 'fastify'
import {ServerContext} from './context'
import {FileID} from './fileID'
import {peekContentType} from './utility'
import {ErrorCode, MediaError} from './error'

export function getMediaMiddleware(context: ServerContext): fastify.RequestHandler {
  return async (req, res) => {
    const fileID = FileID.fromParams(
      req.params['id'],
      req.params['transformation'],
      req.params['filename']
    )

    if ((context.debug || !fileID.isOriginal) && !(await context.storageBackend.exists(fileID))) {
      const originalFileID = fileID.original()

      if (!(await context.storageBackend.exists(originalFileID))) {
        throw new MediaError(ErrorCode.NotFound, 'Image not found.')
      }

      const [inputFileStream] = await context.storageBackend.read(originalFileID)
      const transformedFileStream = await context.imageBackend.transform(fileID, inputFileStream)

      if (!transformedFileStream) {
        throw new MediaError(ErrorCode.InvalidImage, 'Invalid image.')
      }

      await context.storageBackend.write(fileID, transformedFileStream)
    }

    const [fileStream, fileSize] = await context.storageBackend.read(fileID)
    const [mimeType, outputStream] = await peekContentType(fileStream)

    res
      .header('Content-Length', fileSize)
      .header('Content-Type', mimeType)
      .status(200)

    return outputStream
  }
}
