import {ErrorCode} from './error'

export enum TransformationTokenType {
  Width = 'w',
  Height = 'h',
  Quality = 'q',
  Rotation = 'r',
  Focus = 'f',
  Output = 'o'
}

export enum TransformationFocusType {
  TopLeft = 'top_left',
  Top = 'top',
  TopRight = 'top_right',
  Right = 'right',
  BottomRight = 'bottom_right',
  Bottom = 'bottom',
  BottomLeft = 'bottom_left',
  Left = 'left',
  Center = 'center',
  AutoEntropy = 'auto_entropy',
  AutoAttention = 'auto_attention'
}

export enum TransformationRotation {
  Auto = 'auto',
  Rotate0 = '0',
  Rotate90 = '90',
  Rotate180 = '180',
  Rotate270 = '270'
}

export interface Transformation {
  width?: number
  height?: number
  quality?: number
  rotation?: TransformationRotation
  focus?: {x: number; y: number; scale: number} | TransformationFocusType
  output?: string
}

export function transformationFromString(str: string): Transformation {
  const tokens = str.split(',')
  const transformation: Transformation = {}

  for (const token of tokens) {
    const argsIndex = token.indexOf('_')

    const type = token.substring(0, argsIndex)
    const argString = token.substring(argsIndex + 1)

    const args = argString.split(':')

    switch (type) {
      case TransformationTokenType.Width: {
        const width = parseInt(args[0])
        if (isNaN(width)) throw ErrorCode.InvalidTransformation
        transformation.width = width
        break
      }

      case TransformationTokenType.Height: {
        const height = parseInt(args[0])
        if (isNaN(height)) throw ErrorCode.InvalidTransformation
        transformation.height = height
        break
      }

      case TransformationTokenType.Rotation: {
        if (!Object.values(TransformationRotation).includes(args[0] as TransformationRotation)) {
          throw ErrorCode.InvalidTransformation
        }

        transformation.rotation = args[0] as TransformationRotation
        break
      }

      case TransformationTokenType.Quality: {
        const quality = parseFloat(args[0])
        if (isNaN(quality)) throw ErrorCode.InvalidTransformation
        transformation.quality = Math.max(0, Math.min(1, quality))
        break
      }

      case TransformationTokenType.Focus: {
        if (args.length >= 2) {
          const x = parseFloat(args[0])
          const y = parseFloat(args[1])
          const scale = args[2] ? parseFloat(args[2]) : null

          if (isNaN(x) || isNaN(y) || (scale && isNaN(scale))) throw ErrorCode.InvalidTransformation

          transformation.focus = {
            x: Math.min(1, Math.max(0, x)),
            y: Math.min(1, Math.max(0, y)),
            scale: Math.min(5, Math.max(1, scale || 1))
          }
          break
        } else {
          if (
            !Object.values(TransformationFocusType).includes(args[0] as TransformationFocusType)
          ) {
            throw ErrorCode.InvalidTransformation
          }

          transformation.focus = args[0] as TransformationFocusType
          break
        }
      }

      case TransformationTokenType.Output:
        transformation.output = args[0]
        break
    }
  }

  return transformation
}

export function transformationToString(transformation: Transformation): string {
  let tokens = []

  if (transformation.width) {
    tokens.push(`${TransformationTokenType.Width}_${transformation.width}`)
  }

  if (transformation.height) {
    tokens.push(`${TransformationTokenType.Height}_${transformation.height}`)
  }

  if (transformation.rotation) {
    tokens.push(`${TransformationTokenType.Rotation}_${transformation.rotation}`)
  }

  if (transformation.quality) {
    tokens.push(`${TransformationTokenType.Quality}_${transformation.quality}`)
  }

  if (transformation.focus) {
    if (typeof transformation.focus === 'object') {
      const {x, y, scale} = transformation.focus
      tokens.push(`${TransformationTokenType.Focus}_${x}:${y}:${scale}`)
    } else {
      tokens.push(`${TransformationTokenType.Focus}_${transformation.focus}`)
    }
  }

  return tokens.join(',')
}
