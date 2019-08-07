import {FieldProps} from './types'
import {useCallback} from 'react'

export function useField<T>(
  fieldFn: (props: FieldProps<T>) => JSX.Element,
  deps: readonly any[] = []
): (props: FieldProps<T>) => JSX.Element {
  return useCallback(fieldFn, deps)
}
