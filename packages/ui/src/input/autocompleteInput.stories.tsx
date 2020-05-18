import React, {useState, useEffect} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {SelectList, SelectListItem} from './selectList'
import {AutocompleteInputListProps, AutocompleteInput} from './autocompleteInput'
import {Spacing} from '../style/helpers'

export default {
  component: AutocompleteInput,
  title: 'Input|AutocompleteInput',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <>
      <AutocompleteInput
        label="Default"
        value={value}
        valueToChipData={value => ({id: value, label: value})}
        onChange={value => setValue(value)}
        marginBottom={Spacing.Small}>
        {props => <DefaultList {...props} />}
      </AutocompleteInput>
    </>
  )
}

function DefaultList({
  isOpen,
  inputValue,
  highlightedIndex,
  getItemProps,
  getMenuProps
}: AutocompleteInputListProps) {
  const [items, setItems] = useState<string[] | null>(null)

  useEffect(() => {
    setItems(null)

    const timeoutID = setTimeout(() => {
      setItems([`${inputValue} #1`, `${inputValue} #2`, `${inputValue} #3`, `${inputValue} #4`])
    }, 1000)

    return () => clearTimeout(timeoutID)
  }, [isOpen, inputValue])

  return (
    <SelectList {...getMenuProps()}>
      {isOpen &&
        inputValue &&
        (items ? (
          items.map((item, index) => (
            <SelectListItem
              key={item}
              highlighted={index === highlightedIndex}
              {...getItemProps({item, index})}>
              {item}
            </SelectListItem>
          ))
        ) : (
          <SelectListItem>Loading...</SelectListItem>
        ))}
    </SelectList>
  )
}
