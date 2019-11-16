import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TagSelect} from './tagSelect'
import {mockListBoxOptions} from './listBox.stories'

export default {
  component: TagSelect,
  title: 'Input|Text/TagSelect',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => {
  return (
    <TagSelect
      label={'Tags'}
      placeholder={'Add Tag'}
      options={mockListBoxOptions}
      onUpdate={() => {}}
    />
  )
}
