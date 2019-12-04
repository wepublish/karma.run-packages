import React, {useState} from 'react'
import {MaterialIconSearch} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextInput} from './textInput'
import {Spacing} from '../style/helpers'

export default {
  component: TextInput,
  title: 'Input|TextInput',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [stringValue, setStringValue] = useState('Hello World')
  const [numberValue, setNumberValue] = useState('0')

  return (
    <>
      <TextInput
        label="Required"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
        required
      />
      <TextInput
        icon={MaterialIconSearch}
        label="Icon"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextInput
        label="Description"
        description="Some description text"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextInput
        type="password"
        label="Password"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextInput
        type="number"
        label="Number"
        value={numberValue}
        onChange={event => setNumberValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextInput
        label="Disabled"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
        disabled
      />
    </>
  )
}
