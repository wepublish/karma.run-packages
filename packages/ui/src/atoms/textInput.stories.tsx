import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextInput} from './textInput'
import {MaterialIconSearch} from '@karma.run/icons'

export default {
  component: TextInput,
  title: 'Atoms|Input/TextInput',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [value, setValue] = useState('')

  return (
    <TextInput
      icon={MaterialIconSearch}
      label="Label"
      description="Description"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  )
}

export const WithValue = () => (
  <TextInput label={'Label'} value={'Value'} description={'Description'} onChange={() => {}} />
)

export const WithIcon = () => (
  <TextInput
    icon={MaterialIconSearch}
    label="Label"
    value=""
    description="Description"
    onChange={() => {}}
  />
)

export const Disabled = () => (
  <TextInput label={'Label'} value={''} onChange={() => {}} description={'Description'} disabled />
)
