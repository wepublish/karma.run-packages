import React, {memo} from 'react'
import {Value} from 'slate'

import {BlockProps} from './types'
import {RichTextInput, RichTextInputProps} from '../text/richTextInput'

export interface RichTextInputBlockProps
  extends BlockProps<Value>,
    Omit<RichTextInputProps, 'value' | 'onChange'> {
  readonly placeholder?: string
}

export const RichTextInputBlock = memo(function RichTextField({
  value,
  onChange,
  ...props
}: RichTextInputBlockProps) {
  return <RichTextInput value={value} onChange={({value}) => onChange(value)} {...props} />
})
