import React from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate} from '@karma.run/react'
import {isValueConstructor} from '@karma.run/utility'

import {FieldProps} from './types'

export interface ListValue<T = any> {
  readonly id: string
  readonly value: T
}

export interface ListItemProps<T = any> {
  readonly index: number
  readonly value: ListValue<T>
  readonly onChange: (index: number, value: React.SetStateAction<ListValue<T>>) => void
  readonly onRemove: (index: number) => void
  readonly children: (props: FieldProps<T>) => JSX.Element
}

export function ListItem({index, value, onChange, onRemove, children}: ListItemProps) {
  function handleValueChange(fieldValue: React.SetStateAction<any>) {
    onChange(index, value => ({
      ...value,
      value: isFunctionalUpdate(fieldValue) ? fieldValue(value.value) : fieldValue
    }))
  }

  function handleRemove() {
    onRemove(index)
  }

  return (
    <div>
      {children({value: value.value, onChange: handleValueChange})}
      <button onClick={handleRemove}>-</button>
    </div>
  )
}

export interface ListFieldProps<T = any> extends FieldProps<ListValue<T>[]> {
  readonly label?: string
  readonly defaultValue: T | (() => T)
  readonly children: (props: FieldProps<T>) => JSX.Element
}

export function ListField<T>({value, label, defaultValue, children, onChange}: ListFieldProps<T>) {
  function handleItemChange(index: number, itemValue: React.SetStateAction<ListValue>) {
    onChange(value =>
      Object.assign([], value, {
        [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
      })
    )
  }

  function handleAdd() {
    onChange(value => [
      ...value,
      {id: nanoid(), value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue}
    ])
  }

  function handleRemove(itemIndex: number) {
    onChange(value => value.filter((_, index) => index !== itemIndex))
  }

  return (
    <div>
      {label && <label>{label}</label>}
      {value.map((value, index) => (
        <ListItem
          key={value.id}
          index={index}
          value={value}
          onChange={handleItemChange}
          onRemove={handleRemove}>
          {children}
        </ListItem>
      ))}
      <button onClick={handleAdd}>+</button>
    </div>
  )
}
