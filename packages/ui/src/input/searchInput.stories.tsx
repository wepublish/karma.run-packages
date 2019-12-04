import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {SearchInput} from './searchInput'
import {useState} from '@storybook/addons'

export default {
  component: SearchInput,
  title: 'Input|SearchInput',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Standard = () => {
  const [value, setValue] = useState('')
  return <SearchInput placeholder="Search" value={value} onChange={e => setValue(e.target.value)} />
}
