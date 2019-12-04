import fs from 'fs'
import path from 'path'

import {StorageBackend, FileID} from '@karma.run/media'

export default class LocalStorageBackend implements StorageBackend {
  private storagePath: string

  public constructor(storagePath: string) {
    this.storagePath = storagePath
  }

  private fullFilePath(filePath: string) {
    return path.join(this.storagePath, filePath)
  }

  public async write(fileID: FileID, stream: NodeJS.ReadableStream): Promise<void> {
    const filePath = this.fullFilePath(fileID.toFilePath())

    await fs.promises.mkdir(path.dirname(filePath), {recursive: true})

    return new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath)

      writeStream.on('error', err => {
        return reject(err)
      })

      writeStream.on('finish', () => {
        return resolve()
      })

      stream.pipe(writeStream)
    })
  }

  public async read(fileID: FileID): Promise<[NodeJS.ReadableStream, number]> {
    const filePath = path.join(this.storagePath, fileID.toFilePath())
    const stats = await fs.promises.stat(filePath)

    return [fs.createReadStream(filePath), stats.size]
  }

  public async delete(fileID: FileID) {
    const filePath = this.fullFilePath(fileID.toFilePath())
    await fs.promises.unlink(filePath)
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
