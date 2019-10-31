import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextArea} from './textArea'

export default {
  component: TextArea,
  title: 'Atoms|Input/TextArea',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [value, setValue] = useState('')

  return (
    <TextArea
      value={value}
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {
        setValue(value)
      }}
    />
  )
}

export const WithValue = () => () => (
  <TextArea
    label={'Label'}
    value={
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    }
    placeholder={'Placeholder-Label'}
    description={'Description Text'}
    onValueChange={value => {}}
  />
)
