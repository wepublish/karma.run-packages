import {SetStateAction} from 'react'
import {isFunctionalUpdate} from '@karma.run/react'
import {BlockProps} from './block'

export interface TransformBlockProps<T, O> extends BlockProps<T> {
  transformTo: (value: T) => O
  transformFrom: (value: O) => T
  children: (props: BlockProps<O>) => JSX.Element
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
