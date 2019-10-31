export type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V>
  ? T
  : never

export type MapDiscriminatedUnion<T extends Record<K, string>, K extends keyof T> = {
  [V in T[K]]: DiscriminateUnion<T, K, V>
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((
  k: infer I
) => void)
  ? I
  : never
