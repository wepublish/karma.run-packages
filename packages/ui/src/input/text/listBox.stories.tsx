import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {ListBox, AutocompleteOptions} from './listBox'
import Downshift from 'downshift'
import {FilterOption} from '../../molecules/searchBar'

export default {
  component: ListBox,
  title: 'Input|Text/ListBox',
  decorators: [centerLayoutDecorator(0.2)]
}

export const Standard = () => {
  return (
    <Downshift itemToString={item => (item ? item.value : '')}>
      {({getItemProps, getMenuProps, inputValue, highlightedIndex, selectedItem}) => (
        <div>
          <ListBox
            options={mockListBoxOptions}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            isOpen={true}
            inputValue={inputValue}
            highlightedIndex={highlightedIndex}
            selectedItem={selectedItem}
          />
        </div>
      )}
    </Downshift>
  )
}

export const mockListBoxOptions: AutocompleteOptions[] = [
  {id: '0', name: 'afilter'},
  {id: '1', name: 'filter'},
  {id: '2', name: 'filter2'},
  {id: '3', name: 'filter3'}
]
