import React, {useState} from 'react'

import {MaterialIconSearch} from '@karma.run/icons'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Select} from './select'
import {Spacing} from '../style/helpers'

export default {
  component: Select,
  title: 'Input|Select',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [value, setValue] = useState(null)

  return (
    <>
      <Select
        label="Default"
        options={values}
        value={value}
        renderListItem={value => value?.name}
        onChange={value => setValue(value)}
        marginBottom={Spacing.Small}
      />
      <Select
        icon={MaterialIconSearch}
        label="Icon"
        options={values}
        value={value}
        renderListItem={value => value?.name}
        onChange={value => setValue(value)}
        marginBottom={Spacing.Small}
      />
      <Select
        label="Description"
        options={values}
        value={value}
        description="Some description text"
        renderListItem={value => value?.name}
        onChange={value => setValue(value)}
        marginBottom={Spacing.Small}
      />
      <Select
        label="Disabled"
        options={values}
        value={value}
        renderListItem={value => value?.name}
        onChange={value => setValue(value)}
        disabled
      />
    </>
  )
}

const values = [
  {id: '1', name: 'Value #1'},
  {id: '2', name: 'Value #2'},
  {id: '3', name: 'Value #3'},
  {id: '4', name: 'Value #4'}
]
