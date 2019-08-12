export function joinClassNames(...classNames: (string | undefined)[]) {
  return classNames.filter(className => className != undefined).join(' ')
}

export function isFunctionalUpdate<T>(value: React.SetStateAction<T>): value is (value: T) => T {
  return typeof value === 'function' ? true : false
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((
  k: infer I
) => void)
  ? I
  : never
