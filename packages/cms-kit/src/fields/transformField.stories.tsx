import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import {TransformField} from './transformField'
import {TextField} from './textField'

function transformFromStringToNumber(value: string) {
  return parseInt(value)
}

function transformFromNumberToString(value: number) {
  return value.toString()
}

export function TransformFieldWrapper() {
  const [value, setValue] = useState<number>(0)

  return (
    <TransformField
      value={value}
      onChange={value => setValue(value)}
      transformFrom={transformFromStringToNumber}
      transformTo={transformFromNumberToString}>
      {props => <TextField {...props} />}
    </TransformField>
  )
}

storiesOf('Fields|TransformField', module).add('default', () => <TransformFieldWrapper />)
