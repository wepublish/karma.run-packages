import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {HeaderBlock} from './headerBlock'

export default {
  component: HeaderBlock,
  title: 'Blocks|HeaderBlock',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const [value, setValue] = useState({title: '', lead: ''})
  return (
    <HeaderBlock
      value={value}
      onChange={val => {
        setValue(val)
      }}
    />
  )
}
