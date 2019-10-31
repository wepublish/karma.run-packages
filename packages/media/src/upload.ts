import fs from 'fs'
import path from 'path'
import fastify from 'fastify'

import {MediaType} from './mediaType'
import {generateID, getTempFilePathForID, peekContentType, pumpAsync} from './utility'
import {ErrorCode, MediaError} from './error'
import {ServerContext} from './context'
import {FileID} from './fileID'
import {ImageMetadata} from './imageBackend'

export interface TemporaryFile {
  id: string
  filename: string
  path: string
}

export function createTempFile(filename: string, context: ServerContext): TemporaryFile {
  const id = generateID()
  const tempFilePath = getTempFilePathForID(id, context.tempDirPath)

  return {id: generateID(), path: tempFilePath, filename}
}

export interface CommonUploadResponse extends CommonFileMetadata {
  id: string
}

export interface ImageUploadResponse extends CommonUploadResponse, ImageFileMetadata {}
export interface VideoUploadResponse extends CommonUploadResponse, VideoFileMetadata {}
export interface AudioUploadResponse extends CommonUploadResponse, AudioFileMetadata {}
export interface DocumentUploadResponse extends CommonUploadResponse, DocumentFileMetadata {}
export interface OtherUploadResponse extends CommonUploadResponse, OtherFileMetadata {}

export type UploadResponse =
  | ImageUploadResponse
  | VideoUploadResponse
  | AudioUploadResponse
  | DocumentUploadResponse
  | OtherUploadResponse

export interface CommonFileMetadata {
  filename: string
  fileSize: number
  extension: string
  mimeType: string
}

export interface ImageFileMetadata extends CommonFileMetadata, ImageMetadata {
  type: MediaType.Image
}

export interface VideoFileMetadata extends CommonFileMetadata {
  type: MediaType.Video
}

export interface AudioFileMetadata extends CommonFileMetadata {
  type: MediaType.Audio
}

export interface DocumentFileMetadata extends CommonFileMetadata {
  type: MediaType.Document
}

export interface OtherFileMetadata extends CommonFileMetadata {
  type: MediaType.Other
}

export type FileMetadata =
  | ImageFileMetadata
  | VideoFileMetadata
  | AudioFileMetadata
  | DocumentFileMetadata
  | OtherFileMetadata

export function uploadMediaMiddleware(context: ServerContext): fastify.RequestHandler {
  return async req => {
    if (!context.verifyToken(req)) {
      throw new MediaError(ErrorCode.PermissionDenied, 'Permission Denied')
    }

    if (!req.isMultipart) {
      throw new MediaError(
        ErrorCode.InvalidRequest,
        'Content-Type needs to be "multipart/form-data"'
      )
    }

    return new Promise((resolve, reject) => {
      req.multipart(
        async (_field, fileStream, filename, _encoding, _mimetype) => {
          const tempFile = createTempFile(filename, context)

          async function cleanup() {
            fs.unlink(tempFile.path, err => {
              if (err) req.log.error(`Error while cleaning up temporary file: ${err}`)
            })
          }

          await pumpAsync(fileStream, fs.createWriteStream(tempFile.path))

          if (fileStream.truncated) {
            await cleanup()

            return reject(
              new MediaError(
                ErrorCode.MaxUploadSizeExceeded,
                `File exceeds maximal upload size of ${context.maxUploadSize} bytes.`,
                {maxUploadSize: context.maxUploadSize}
              )
            )
          }

          const result = await uploadMedia(tempFile, null, context)

          await cleanup()
          resolve(result)
        },
        err => {
          if (err) reject(err)
        }
      )
    })
  }
}

export async function uploadMedia(
  uploadFile: TemporaryFile,
  overrideID: FileID | null,
  context: ServerContext
): Promise<UploadResponse> {
  const fileStream = fs.createReadStream(uploadFile.path)
  const metadata = await getTemporaryFileMetadata(uploadFile, context)
  const fileID = new FileID(undefined, undefined, metadata.filename)

  await context.storageBackend.write(fileID, fileStream)
  if (overrideID) await context.storageBackend.delete(overrideID)

  return {
    id: fileID.id,
    ...metadata
  }
}

export async function getTemporaryFileMetadata(
  file: TemporaryFile,
  context: ServerContext
): Promise<FileMetadata> {
  const fileStream = fs.createReadStream(file.path)

  const [mimeType, outputStream] = await peekContentType(fileStream)
  const parsedPath = path.parse(file.filename)

  const stats = await fs.promises.stat(file.path)
  const imageMetadata = await context.imageBackend.getMetadata(outputStream)

  const commonMetadata: CommonFileMetadata = {
    filename: parsedPath.name,
    fileSize: stats.size,
    extension: parsedPath.ext,
    mimeType
  }

  if (imageMetadata) {
    return {
      type: MediaType.Image,
      ...commonMetadata,
      ...imageMetadata
    }
  }

  return {
    type: MediaType.Other,
    ...commonMetadata
  }
}
