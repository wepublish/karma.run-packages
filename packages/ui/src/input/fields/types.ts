export interface FieldProps<V = any> {
  readonly value: V
  readonly onChange: React.Dispatch<React.SetStateAction<V>>
}

export type FieldConstructorFn<V = any> = (props: FieldProps<V>) => JSX.Element
