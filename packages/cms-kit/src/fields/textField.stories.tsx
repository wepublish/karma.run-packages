import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextField} from './textField'

export default {
  component: TextField,
  title: 'Fields|TextField',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [value, setValue] = useState('')
  return <TextField value={value} onChange={value => setValue(value)} />
}
