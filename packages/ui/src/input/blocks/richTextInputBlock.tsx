import React, {memo, useRef, useEffect} from 'react'
import {Value} from 'slate'
import {Editor} from 'slate-react'

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
  allowInit,
  ...props
}: RichTextInputBlockProps) {
  const ref = useRef<Editor>(null)

  useEffect(() => {
    if (allowInit) {
      // TODO: Slate bug? We have to delay focus for one tick.
      const timeoutID = setTimeout(() => ref.current?.focus(), 0)
      return () => clearTimeout(timeoutID)
    }

    return () => {}
  }, [])

  return (
    <RichTextInput ref={ref} value={value} onChange={({value}) => onChange(value)} {...props} />
  )
})
