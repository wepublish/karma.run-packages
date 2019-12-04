import React from 'react'

import {useState} from '@storybook/addons'
import {centerLayoutDecorator} from '../.storybook/decorators'

import {Radio} from './radio'
import {RadioGroup} from './radioGroup'

export default {
  component: RadioGroup,
  title: 'Input|RadioGroup',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [value, setValue] = useState('')

  return (
    <RadioGroup name="foobar" value={value} onChange={event => setValue(event.target.value)}>
      <Radio label="Foo" value="foo" />
      <Radio label="Bar" value="bar" />
    </RadioGroup>
  )
}
