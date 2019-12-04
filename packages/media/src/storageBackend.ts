import {FileID} from './fileID'

export interface StorageBackend {
  write(fileID: FileID, stream: NodeJS.ReadableStream): Promise<void>
  read(fileID: FileID): Promise<[NodeJS.ReadableStream, number]>
  delete(fileID: FileID): Promise<void>
  exists(fileID: FileID): Promise<boolean>
}
