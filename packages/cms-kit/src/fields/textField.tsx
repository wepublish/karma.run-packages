import React from 'react'
import {FieldProps} from './types'

export function TextField({value, onChange}: FieldProps<string>) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => {
        onChange(e.currentTarget.value)
      }}
    />
  )
}
