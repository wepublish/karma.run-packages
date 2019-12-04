import React, {useState} from 'react'
import {MaterialIconSearch} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextArea} from './textArea'
import {Spacing} from '../style/helpers'

export default {
  component: TextArea,
  title: 'Input|TextArea',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [stringValue, setStringValue] = useState('Hello World')

  return (
    <>
      <TextArea
        label="Required"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
        required
      />
      <TextArea
        icon={MaterialIconSearch}
        label="Icon"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextArea
        label="Description"
        description="Some description text"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
      />
      <TextArea
        label="Disabled"
        value={stringValue}
        onChange={event => setStringValue(event.target.value)}
        marginBottom={Spacing.Small}
        disabled
      />
    </>
  )
}
