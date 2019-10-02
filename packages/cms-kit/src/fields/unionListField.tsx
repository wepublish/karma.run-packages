import React, {useState, Fragment} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, isValueConstructor, useStyle, cssRule} from '@karma.run/react'

import {FieldProps, UnionListValue, UnionListCaseMapForValue, UnionFieldCaseMap} from './types'
import {Icon, IconType} from '../atoms/icon'
import {ListItemWrapper} from '../molecules/listItemWrapper'
import {AddBlockMenu} from '../organisms/addBlockMenu'

const UnionListFieldStyle = cssRule({
  width: '100%'
})

export interface UnionListItemProps<T extends string = string, V = any> {
  readonly index: number
  readonly value: UnionListValue<T, V>
  readonly icon: IconType
  readonly onChange: (index: number, value: React.SetStateAction<UnionListValue<T, V>>) => void
  readonly onDelete: (index: number) => void
  readonly onMoveUp?: (index: number) => void
  readonly onMoveDown?: (index: number) => void
  readonly children: (props: FieldProps<V>) => JSX.Element
}

function UnionListItem({
  index,
  value,
  icon,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  children
}: UnionListItemProps) {
  function handleValueChange(fieldValue: React.SetStateAction<any>) {
    onChange(index, value => ({
      ...value,
      value: isFunctionalUpdate(fieldValue) ? fieldValue(value.value) : fieldValue
    }))
  }

  return (
    <ListItemWrapper
      icon={icon}
      onDelete={() => onDelete(index)}
      onMoveUp={onMoveUp ? () => onMoveUp(index) : undefined}
      onMoveDown={onMoveDown ? () => onMoveDown(index) : undefined}>
      {children({value: value.value, onChange: handleValueChange})}
    </ListItemWrapper>
  )
}

export interface UnionListFieldProps<V extends UnionListValue> extends FieldProps<V[]> {
  readonly label?: string
  readonly children: UnionListCaseMapForValue<V>
}

export function UnionListField<V extends UnionListValue>({
  value: values,
  label,
  children,
  onChange
}: UnionListFieldProps<V>) {
  const [casePickerIndex, setCasePickerIndex] = useState<number | null>(null)
  const unionFieldMap = children as UnionFieldCaseMap
  const {css} = useStyle()

  function handleItemChange(index: number, itemValue: React.SetStateAction<UnionListValue>) {
    onChange(value =>
      Object.assign([], value, {
        [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
      })
    )
  }

  function handleAdd(index: number, type: string) {
    onChange(values => {
      const {defaultValue} = unionFieldMap[type]
      const valuesCopy = values.slice()

      valuesCopy.splice(index + 1, 0, {
        id: nanoid(),
        type,
        value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue
      } as V)

      return valuesCopy
    })

    setCasePickerIndex(null)
  }

  function handleRemove(itemIndex: number) {
    onChange(value => value.filter((_value, index) => index !== itemIndex))
  }

  function handleMoveIndex(from: number, to: number) {
    onChange(values => {
      const valuesCopy = values.slice()
      const [value] = valuesCopy.splice(from, 1)

      valuesCopy.splice(to, 0, value)

      return valuesCopy
    })
  }

  function handleMoveUp(index: number) {
    handleMoveIndex(index, index - 1)
  }

  function handleMoveDown(index: number) {
    handleMoveIndex(index, index + 1)
  }

  function addButtonForIndex(index: number) {
    return (
      <>
        <AddBlockMenu
          menuItems={Object.entries(unionFieldMap).map(([type, {icon, label}]) => ({
            id: type,
            icon,
            label
          }))}
          onMenuItemClick={({id}) => handleAdd(index, id)}
        />
        <div>
          {casePickerIndex === index &&
            Object.entries(unionFieldMap).map(([type, value]) => (
              <button key={type} onClick={() => handleAdd(index, type)}>
                <Icon type={value.icon} />
                {value.label}
              </button>
            ))}
        </div>
      </>
    )
  }

  function listItemForIndex(value: V, index: number) {
    const hasPrevIndex = index - 1 >= 0
    const hasNextIndex = index + 1 < values.length

    const unionCase = unionFieldMap[value.type]

    return (
      <Fragment key={value.id}>
        <UnionListItem
          index={index}
          value={value}
          icon={unionCase.icon}
          onDelete={handleRemove}
          onChange={handleItemChange}
          onMoveUp={hasPrevIndex ? handleMoveUp : undefined}
          onMoveDown={hasNextIndex ? handleMoveDown : undefined}>
          {unionCase.field}
        </UnionListItem>
        {addButtonForIndex(index)}
      </Fragment>
    )
  }

  return (
    <div className={css(UnionListFieldStyle)}>
      {label && <label>{label}</label>}
      {values.map((value, index) => listItemForIndex(value, index))}
      {values.length === 0 && addButtonForIndex(values.length - 1)}
    </div>
  )
}
