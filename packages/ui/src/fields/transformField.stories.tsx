import React, {useState} from 'react'

import {TransformField} from './transformField'
import {TextField} from './textField'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: TransformField,
  title: 'Fields|TransformField',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [value, setValue] = useState<number>(0)

  return (
    <TransformField
      value={value}
      onChange={value => setValue(value)}
      transformTo={value => value.toString()}
      transformFrom={(value: string) => parseInt(value)}>
      {props => <TextField {...props} />}
    </TransformField>
  )
}
