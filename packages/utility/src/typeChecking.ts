export function isObject<T>(unknown: unknown): unknown is Record<any, T> {
  return typeof unknown === 'object' && unknown != null && !Array.isArray(unknown)
}

export function isArray<T>(unknown: unknown): unknown is T[] {
  return Array.isArray(unknown)
}

export function isSymbol(unknown: unknown): unknown is symbol {
  return typeof unknown === 'symbol'
}

export function isString(unknown: unknown): unknown is string {
  return typeof unknown === 'string'
}

export function isNumber(unknown: unknown): unknown is number {
  return typeof unknown === 'number'
}

export function isBigInt(unknown: unknown): unknown is bigint {
  return typeof unknown === 'bigint'
}

export function isFunction(unknown: unknown): unknown is Function {
  return typeof unknown === 'function'
}

export function isBoolean(unknown: unknown): unknown is boolean {
  return typeof unknown === 'boolean'
}

export type ValueConstructor<T> = T | (() => T)

export function isValueConstructor<T>(value: T | (() => T)): value is () => T {
  return typeof value === 'function' ? true : false
}
