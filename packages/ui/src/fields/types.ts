import {IconType} from '../atoms/icon'
import {UnionToIntersection, ValueConstructor} from '@karma.run/utility'

export interface FieldProps<V = any> {
  readonly value: V
  readonly onChange: React.Dispatch<React.SetStateAction<V>>
}

export type FieldConstructorFn<V = any> = (props: FieldProps<V>) => JSX.Element

export interface UnionFieldCaseProps<V = any> {
  readonly label: string
  readonly icon: IconType
  readonly defaultValue: ValueConstructor<V>
  readonly field: FieldConstructorFn<V>
}

export interface UnionListValue<T extends string = string, V = any> {
  readonly id: string
  readonly type: T
  readonly value: V
}

export type UnionFieldCaseMap = Record<string, UnionFieldCaseProps>

export type UnionListCaseMapForValue<R extends UnionListValue> = UnionToIntersection<
  R extends UnionListValue<infer T, infer V> ? {[K in T]: UnionFieldCaseProps<V>} : never
>
