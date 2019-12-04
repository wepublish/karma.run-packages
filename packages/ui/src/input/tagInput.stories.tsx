import React, {useState, useEffect} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TagInput} from './tagInput'
import {Spacing} from '../style/helpers'

export default {
  component: TagInput,
  title: 'Input|TagInput',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <>
      <TagInput
        label="Default"
        value={value}
        onChange={value => setValue(value)}
        marginBottom={Spacing.Small}
      />
      <TagInput
        label="Description"
        description="Some description text"
        value={value}
        onChange={value => setValue(value)}
      />
    </>
  )
}
