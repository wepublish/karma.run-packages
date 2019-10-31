import path from 'path'
import crypto from 'crypto'
import pump from 'pump'

import mmmagic from 'mmmagic'
import peek from 'buffer-peek-stream'
import nanoid from 'nanoid/generate'

import {MediaType} from './mediaType'

export function generateID() {
  return nanoid('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 15)
}

export function sanitizeFilename(filename: string) {
  return filename
    .substr(0, 50)
    .replace(/[^a-z0-9]+?([a-z0-9]|$)/gi, '-$1')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .substr(0, 20)
}

export function computeMD5Hash(str: string) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

export function getTempFilePathForID(id: string, tempDirPath: string) {
  return path.join(tempDirPath, id)
}

export function getMetadataPathForID(id: string, tempDirPath: string) {
  return path.join(tempDirPath, `${id}.meta`)
}

export function getMediaType(mimeType: string) {
  if (mimeType.startsWith('image/')) return MediaType.Image
  if (mimeType.startsWith('video/')) return MediaType.Video
  if (mimeType.startsWith('audio/')) return MediaType.Audio
  if (mimeType.startsWith('text/') || mimeType.endsWith('pdf')) return MediaType.Document

  return MediaType.Other
}

const magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE)

export function peekContentType(
  fileStream: NodeJS.ReadableStream
): Promise<[string, NodeJS.ReadableStream]> {
  return new Promise((resolve, reject) => {
    peek(fileStream, 32, (err: Error, data: Buffer, outputStream: NodeJS.ReadableStream) => {
      if (err) return reject(err)

      magic.detect(data, (err, mimeType) => {
        if (err) return reject(err)
        resolve([mimeType === 'image/svg' ? 'image/svg+xml' : mimeType, outputStream])
      })
    })
  })
}

export async function pumpAsync(...streams: pump.Stream[]) {
  return new Promise((resolve, reject) => {
    pump(streams, err => {
      if (err) return reject(err)
      return resolve()
    })
  })
}
