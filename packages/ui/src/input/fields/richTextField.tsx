import React, {memo} from 'react'
import {Value} from 'slate'

import {FieldProps} from './types'
import {RichTextInput} from '../text/richTextInput'

export interface RichTextFieldProps extends FieldProps<Value> {
  readonly placeholder?: string
}

export const RichTextField = memo(function RichTextField({
  value,
  placeholder,
  onChange
}: RichTextFieldProps) {
  return (
    <RichTextInput
      value={value}
      placeholder={placeholder}
      onChange={({value}) => onChange(value)}
    />
  )
})
