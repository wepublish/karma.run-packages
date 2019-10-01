export function toArray<T>(value?: T | T[]): T[] {
  return value != null ? (Array.isArray(value) ? value : [value]) : []
}
