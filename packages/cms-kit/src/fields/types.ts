export interface FieldProps<T = any> {
  readonly value: T
  readonly onChange: React.Dispatch<React.SetStateAction<T>>
}
