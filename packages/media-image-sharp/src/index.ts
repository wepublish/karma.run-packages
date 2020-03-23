import sharp from 'sharp'

import {
  ImageBackend,
  FileID,
  TransformationRotation,
  TransformationFocusType,
  Transformation,
  ImageMetadata,
  MediaError,
  ErrorCode
} from '@karma.run/media'

export interface SharpImageBackendOptions {
  maxSize?: number
}

interface Size {
  width: number
  height: number
}

export default class SharpImageBackend implements ImageBackend {
  private maxSize: number

  constructor(opts?: SharpImageBackendOptions) {
    this.maxSize = (opts ? opts.maxSize : undefined) || 2048
  }

  async getMetadata(fileStream: NodeJS.ReadableStream): Promise<ImageMetadata | null> {
    try {
      const metadataStream = fileStream.pipe(sharp())
      const metadata = await metadataStream.metadata()

      if (!metadata.width || !metadata.height || !metadata.format) return null

      // Any orientation greater than 4 means we have to flip the width and height.
      if (metadata.orientation && metadata.orientation > 4) {
        return {
          width: metadata.height,
          height: metadata.width,
          format: metadata.format,
          orientation: metadata.orientation
        }
      } else {
        return {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          orientation: metadata.orientation
        }
      }
    } catch {
      return null
    }
  }

  async transform(
    fileID: FileID,
    fileStream: NodeJS.ReadableStream
  ): Promise<NodeJS.ReadableStream> {
    if (!fileID.transformation) return fileStream

    try {
      const metadataStream = fileStream.pipe(sharp())
      const metadata = await metadataStream.rotate().metadata()

      if (!metadata.width || !metadata.height) {
        throw new MediaError(ErrorCode.InvalidImage, 'Invalid image.')
      }

      const originalSize =
        (metadata.orientation || 0) > 4
          ? {width: metadata.height, height: metadata.width}
          : {width: metadata.width, height: metadata.height}

      return this.handleTransformation(
        metadataStream.pipe(sharp()),
        fileID.transformation,
        originalSize
      )
    } catch (err) {
      if (err instanceof MediaError) {
        throw err
      }

      throw new MediaError(ErrorCode.InvalidImage, 'Invalid image.')
    }
  }

  private handleTransformation(
    sharpStream: sharp.Sharp,
    transformation: Readonly<Transformation>,
    originalSize: Size
  ): sharp.Sharp {
    let width = transformation.width
    let height = transformation.height

    // Constrain width and height to original image's and maximum size.
    if (width && height) {
      const aspectRatio = width / height

      if (width > height) {
        width = Math.round(Math.min(width, originalSize.width, this.maxSize))
        height = Math.round(width / aspectRatio)
      } else {
        height = Math.round(Math.min(height, originalSize.height, this.maxSize))
        width = Math.round(height * aspectRatio)
      }
    } else if (width) {
      width = Math.round(Math.min(width, originalSize.width, this.maxSize))
    } else if (height) {
      height = Math.round(Math.min(height, originalSize.height, this.maxSize))
    }

    switch (transformation.rotation) {
      case TransformationRotation.Rotate0:
        sharpStream.rotate(0)
        break

      case TransformationRotation.Rotate90:
        sharpStream.rotate(90)
        break

      case TransformationRotation.Rotate180:
        sharpStream.rotate(180)
        break

      case TransformationRotation.Rotate270:
        sharpStream.rotate(270)
        break

      case TransformationRotation.Auto:
        // We already normalize the rotation on any transformation.
        break
    }

    if (width && height && typeof transformation.focus === 'object') {
      const cropAspectRatio = width / height
      const imageAspectRatio = originalSize.width / originalSize.height

      const fittingSize =
        cropAspectRatio > imageAspectRatio
          ? {width: width, height: Math.round(width / imageAspectRatio)}
          : {width: Math.round(height * imageAspectRatio), height: height}

      const scaledFittingSize = {
        width: fittingSize.width * transformation.focus.scale,
        height: fittingSize.height * transformation.focus.scale
      }

      const scaledFocusPoint = {
        x: transformation.focus.x * scaledFittingSize.width,
        y: transformation.focus.y * scaledFittingSize.height
      }

      const region = {
        left: Math.round(
          Math.min(Math.max(scaledFocusPoint.x - width / 2, 0), scaledFittingSize.width - width)
        ),
        top: Math.round(
          Math.min(Math.max(scaledFocusPoint.y - height / 2, 0), scaledFittingSize.height - height)
        ),
        width,
        height
      }

      sharpStream.resize(scaledFittingSize.width, scaledFittingSize.height).extract(region)
    } else if (width || height) {
      sharpStream.resize(width, height, {
        fit: 'cover',
        position:
          typeof transformation.focus === 'string'
            ? gravityForFocusType(transformation.focus)
            : undefined
      })
    }

    switch (transformation.output) {
      case 'png':
        sharpStream.png()
        break

      case 'jpg':
      case 'jpeg':
        sharpStream.jpeg()
        break

      case 'webp':
        sharpStream.webp()
        break

      case undefined:
        break

      default:
        throw new MediaError(ErrorCode.InvalidTransformation, 'Invalid output format.', {
          allowed: ['png', 'jpg', 'jpeg', 'webp'],
          requested: transformation.output
        })
    }

    return sharpStream
  }
}

export function focusPointForFocusType(focus: TransformationFocusType) {
  switch (focus) {
    default:
      return {x: 0.5, y: 0.5}
  }
}

export function gravityForFocusType(focus: TransformationFocusType) {
  switch (focus) {
    case TransformationFocusType.AutoAttention:
      return sharp.strategy.attention

    case TransformationFocusType.AutoEntropy:
      return sharp.strategy.entropy

    case TransformationFocusType.TopLeft:
      return sharp.gravity.northwest

    case TransformationFocusType.Top:
      return sharp.gravity.north

    case TransformationFocusType.TopRight:
      return sharp.gravity.northeast

    case TransformationFocusType.Right:
      return sharp.gravity.east

    case TransformationFocusType.BottomRight:
      return sharp.gravity.southeast

    case TransformationFocusType.Bottom:
      return sharp.gravity.south

    case TransformationFocusType.BottomLeft:
      return sharp.gravity.southwest

    case TransformationFocusType.Left:
      return sharp.gravity.west

    case TransformationFocusType.Center:
      return sharp.gravity.center
  }
}
