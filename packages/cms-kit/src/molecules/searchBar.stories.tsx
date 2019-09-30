import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {SearchBar} from './searchBar'
import {useState} from '@storybook/addons'

export default {
  component: SearchBar,
  title: 'Molecules|SearchBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [searchVal, setSearchVal] = useState('')

  return (
    <SearchBar
      filterOptions={[{id: '1', name: 'filter'}]}
      searchValue={searchVal}
      onFilterSelected={() => {}}
      onTextInput={value => {
        setSearchVal(value)
      }}
      onClear={() => {
        setSearchVal('')
      }}></SearchBar>
  )
}
