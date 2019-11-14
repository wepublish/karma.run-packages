import {SetStateAction} from 'react'
import {BlockProps} from './types'
import {isFunctionalUpdate} from '@karma.run/react'

export interface TransformBlockProps<T, O> extends BlockProps<T> {
  readonly transformTo: (value: T) => O
  readonly transformFrom: (value: O) => T
  readonly children: (props: BlockProps<O>) => JSX.Element
}

export function TransformBlock<T, O>({
  transformTo,
  transformFrom,
  children,
  value,
  onChange,
  autofocus
}: TransformBlockProps<T, O>) {
  const transformedValue = transformTo(value)
  const onTransformedChange = (newValue: SetStateAction<O>) => {
    onChange(transformFrom(isFunctionalUpdate(newValue) ? newValue(transformedValue) : newValue))
  }

  return children({
    value: transformedValue,
    onChange: onTransformedChange,
    autofocus
  })
}
