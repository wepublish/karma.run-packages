import {FileID} from './fileID'

export interface ImageMetadata {
  width: number
  height: number
  format: string
  orientation?: number
}

export interface ImageBackend {
  transform(fileID: FileID, fileStream: NodeJS.ReadableStream): Promise<NodeJS.ReadableStream>
  getMetadata(fileStream: NodeJS.ReadableStream): Promise<ImageMetadata | null>
}
