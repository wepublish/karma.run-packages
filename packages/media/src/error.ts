export enum ErrorCode {
  Internal = 'internal',
  InvalidRequest = 'invalidRequest',
  InvalidExtension = 'invalidExtension',
  InvalidTransformation = 'invalidTransformation',
  InvalidImage = 'invalidImage',
  MaxUploadSizeExceeded = 'maxUploadSizeExceeded',
  PermissionDenied = 'permissionDenied',
  NotFound = 'notFound'
}

export class MediaError extends Error {
  public readonly code: ErrorCode
  public readonly data?: any

  constructor(code: ErrorCode, message: string, data?: any) {
    super(message)

    this.code = code
    this.data = data
  }
}

export interface ErrorResponse<T = any> {
  code: ErrorCode
  message: string
  data?: T
}

export function createErrorResponse<T = any>(error: ErrorResponse<T>): ErrorResponse<T> {
  return error
}

export function statusCodeForErrorCode(type: ErrorCode): number {
  switch (type) {
    case ErrorCode.InvalidRequest:
    case ErrorCode.InvalidExtension:
    case ErrorCode.InvalidTransformation:
    case ErrorCode.InvalidImage:
    case ErrorCode.MaxUploadSizeExceeded:
      return 400

    case ErrorCode.NotFound:
      return 404

    case ErrorCode.PermissionDenied:
      return 401

    default:
      return 500
  }
}
