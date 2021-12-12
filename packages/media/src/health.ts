import {ServerContext} from './context'
import fastify from 'fastify'
import {ErrorCode, MediaError} from './error'
import {FileID} from './fileID'
import {generateID} from './utility'
import {Readable} from 'stream'

export function healthMiddleware(context: ServerContext): fastify.RequestHandler {
  return async req => {
    if (!context.verifyToken(req)) {
      throw new MediaError(ErrorCode.PermissionDenied, 'Permission Denied')
    }

    return new Promise(async (resolve, reject) => {
      const testID = new FileID(generateID())
      const testStream = new Readable()
      testStream.push('ThisIsRandomDataToTest')
      testStream.push(null)
      await context.storageBackend.write(testID, testStream)
      const [, size] = await context.storageBackend.read(testID)
      if (size === 0) reject('file size is 0')
      await context.storageBackend.delete(testID)
      const fileExist = await context.storageBackend.exists(testID)
      if (fileExist) reject('file was not deleted')
      resolve({})
    })
  }
}
