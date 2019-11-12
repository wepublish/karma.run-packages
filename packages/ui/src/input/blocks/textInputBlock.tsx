import React, {memo} from 'react'
import {BlockProps} from './types'
import {TextInput} from '../../atoms/textInput'

export const TextInputBlock = memo(function TextField({value, onChange}: BlockProps<string>) {
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
