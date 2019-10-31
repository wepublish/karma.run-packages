import path from 'path'

import {generateID, computeMD5Hash} from './utility'
import {Transformation, transformationToString, transformationFromString} from './transformation'

export class FileID {
  readonly id: string
  readonly transformation?: Readonly<Transformation>
  readonly filename?: string

  constructor(
    id: string = generateID(),
    transformation?: Readonly<Transformation>,
    filename?: string
  ) {
    this.id = id
    this.filename = filename
    this.transformation = transformation
  }

  get isOriginal(): boolean {
    return this.transformation == null
  }

  original(): FileID {
    if (!this.isOriginal) return new FileID(this.id)
    return this
  }

  toURLPath() {
    const segments = [
      this.id,
      ...(this.transformation ? [transformationToString(this.transformation)] : []),
      ...(this.filename ? [`${encodeURIComponent(this.filename)}`] : [])
    ]

    return segments.join('/')
  }

  toFilePath() {
    let filename = 'original'

    if (this.transformation != null) {
      filename = computeMD5Hash(transformationToString(this.transformation))
    }

    const segments = [this.id, `${filename}`]
    return path.join(...segments)
  }

  static fromParams(id: string, transformation?: string, filename?: string) {
    return new FileID(
      id,
      transformation ? transformationFromString(transformation) : undefined,
      filename
    )
  }
}
