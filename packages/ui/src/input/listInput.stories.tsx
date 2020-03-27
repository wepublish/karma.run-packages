import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ListInput, ListValue} from './listInput'
import {TextInput} from './textInput'

export default {
  component: ListInput,
  title: 'Input|ListInput',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => {
  const [values, setValues] = useState<ListValue<string>[]>([
    {id: '1', value: 'Hello'},
    {id: '2', value: 'World'},
    {id: '3', value: 'Test'}
  ])

  return (
    <ListInput value={values} onChange={setValues} defaultValue={''}>
      {props => (
        <TextInput
          label="Label"
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
        />
      )}
    </ListInput>
  )
}

export const Disabled = () => {
  const [values, setValues] = useState<ListValue<string>[]>([
    {id: '1', value: 'Hello'},
    {id: '2', value: 'World'},
    {id: '3', value: 'Test'}
  ])

  return (
    <ListInput value={values} onChange={setValues} defaultValue={''} disabled>
      {props => (
        <TextInput
          label="Label"
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
        />
      )}
    </ListInput>
  )
}
