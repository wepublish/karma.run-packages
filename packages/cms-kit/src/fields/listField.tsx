import React, {memo, useCallback} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, isValueConstructor} from '@karma.run/react'

import {FieldProps} from './types'

export interface ListValue<T = any> {
  readonly id: string
  readonly value: T
}

export interface ListProps<T = any> extends FieldProps<ListValue<T>[]> {
  readonly label?: string
  readonly defaultValue: T | (() => T)
  readonly children: (props: FieldProps<T>) => JSX.Element
}

export interface ListItemProps<T = any> {
  readonly index: number
  readonly value: ListValue<T>
  readonly onChange: (index: number, value: React.SetStateAction<ListValue<T>>) => void
  readonly onRemove: (index: number) => void
  readonly children: (props: FieldProps<T>) => JSX.Element
}

export const ListItem = memo<ListItemProps>(function ListItem({
  index,
  value,
  onChange,
  onRemove,
  children
}) {
  const handleValueChange = useCallback(
    (fieldValue: React.SetStateAction<any>) => {
      onChange(index, value => ({
        ...value,
        value: isFunctionalUpdate(fieldValue) ? fieldValue(value.value) : fieldValue
      }))
    },
    [index]
  )

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [index])

  return (
    <div>
      {children({value: value.value, onChange: handleValueChange})}
      <button onClick={handleRemove}>-</button>
    </div>
  )
})

export function ListField<T>({value, label, defaultValue, children, onChange}: ListProps<T>) {
  const handleItemChange = useCallback(
    (index: number, itemValue: React.SetStateAction<ListValue>) => {
      onChange(value =>
        Object.assign([], value, {
          [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
        })
      )
    },
    []
  )

  const handleAdd = useCallback(() => {
    onChange(value => [
      ...value,
      {id: nanoid(), value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue}
    ])
  }, [])

  const handleRemove = useCallback((itemIndex: number) => {
    onChange(value => value.filter((_, index) => index !== itemIndex))
  }, [])

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
