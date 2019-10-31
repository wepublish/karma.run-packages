import React, {memo} from 'react'
import {FieldProps} from './types'
import {TextInput} from '../atoms/textInput'

export const TextField = memo(function TextField({value, onChange}: FieldProps<string>) {
  return (
    <TextInput
      label="Label"
      value={value}
      onChange={e => {
        onChange(e.currentTarget.value)
      }}
    />
  )
})
