import fastify from 'fastify'
import {ServerContext} from './context'
import {MediaError, ErrorCode} from './error'
import {FileID} from './fileID'

export function deleteMediaMiddleware({
  storageBackend,
  verifyToken
}: ServerContext): fastify.RequestHandler {
  return async (req, res) => {
    if (!verifyToken(req)) {
      throw new MediaError(ErrorCode.PermissionDenied, 'Permission Denied')
    }

    await storageBackend.delete(FileID.fromParams(req.params['id']))

    res.status(204)
  }
}
