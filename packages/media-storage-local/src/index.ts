import fs from 'fs'
import path from 'path'

import {StorageBackend, FileID} from '@wepublish/krp-media-server'

export default class LocalStorageBackend implements StorageBackend {
  private storagePath: string

  public constructor(storagePath: string) {
    this.storagePath = storagePath
  }

  private fullFilePath(filePath: string, temp: boolean = false) {
    return path.join(this.storagePath, temp ? '.temp' : '', filePath)
  }

  public async write(
    fileID: FileID,
    stream: NodeJS.ReadableStream,
    replace: boolean
  ): Promise<void> {
    const filePath = this.fullFilePath(fileID.toFilePath(), replace)
    const dirname = path.dirname(filePath)

    await fs.promises.mkdir(dirname, {recursive: true})

    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath)

      writeStream.on('error', err => {
        return reject(err)
      })

      writeStream.on('finish', () => {
        return resolve()
      })

      stream.pipe(writeStream)
    })

    if (replace) {
      const originalFilePath = this.fullFilePath(fileID.toFilePath())
      const originalDirname = path.dirname(originalFilePath)

      await fs.promises.rmdir(originalDirname, {recursive: true})
      await fs.promises.rename(dirname, originalDirname)
    }
  }

  public async read(fileID: FileID): Promise<[NodeJS.ReadableStream, number]> {
    const filePath = path.join(this.storagePath, fileID.toFilePath())
    const stats = await fs.promises.stat(filePath)

    return [fs.createReadStream(filePath), stats.size]
  }

  public async delete(fileID: FileID) {
    const dirPath = path.dirname(this.fullFilePath(fileID.toFilePath()))
    await fs.promises.rmdir(dirPath, {recursive: true})
  }

  public async exists(fileID: FileID): Promise<boolean> {
    const filePath = this.fullFilePath(fileID.toFilePath())

    try {
      await fs.promises.stat(filePath)
      return true
    } catch (err) {
      return false
    }
  }
}
