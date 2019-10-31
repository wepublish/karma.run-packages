export const enum MediaType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Document = 'document',
  Other = 'other'
}

export function isValidMediaType(rawMediaType: string): rawMediaType is MediaType {
  switch (rawMediaType) {
    case MediaType.Image:
    case MediaType.Video:
    case MediaType.Audio:
    case MediaType.Document:
    case MediaType.Other:
      return true
  }

  return false
}
