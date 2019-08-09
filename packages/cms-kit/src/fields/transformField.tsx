import {useMemo, useCallback, SetStateAction} from 'react'
import {FieldProps} from './types'
import {isFunctionalUpdate} from '@karma.run/react'

export interface TransformFieldProps<T, O> extends FieldProps<T> {
  readonly transformTo: (value: T) => O
  readonly transformFrom: (value: O) => T
  readonly children: (props: FieldProps<O>) => JSX.Element
}

let test: any = null

export function TransformField<T, O>({
  transformTo,
  transformFrom,
  children,
  value,
  onChange
}: TransformFieldProps<T, O>) {
  const transformedValue = transformTo(value)
  const onTransformedChange = (newValue: SetStateAction<O>) => {
    onChange(transformFrom(isFunctionalUpdate(newValue) ? newValue(transformedValue) : newValue))
  }

  return children({
    value: transformedValue,
    onChange: onTransformedChange
  })
}
