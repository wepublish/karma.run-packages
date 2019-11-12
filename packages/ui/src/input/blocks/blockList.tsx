import React, {Fragment} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, useStyle, cssRule} from '@karma.run/react'
import {isValueConstructor, ValueConstructor, UnionToIntersection} from '@karma.run/utility'

import {BlockProps, BlockConstructorFn} from './types'

import {IconType} from '../../atoms/icon'
import {ListItemWrapper} from '../../molecules/listItemWrapper'
import {AddBlockInput} from '../other/addBlockInput'
import {Box} from '../../layout/box'
import {Spacing} from '../../style/helpers'

export interface BlockCaseProps<V = any> {
  readonly label: string
  readonly icon: IconType
  readonly defaultValue: ValueConstructor<V>
  readonly field: BlockConstructorFn<V>
}

export interface BlockListValue<T extends string = string, V = any> {
  readonly id: string
  readonly type: T
  readonly value: V
}

export type BlockCaseMap = Record<string, BlockCaseProps>

export type BlockCaseMapForValue<R extends BlockListValue> = UnionToIntersection<
  R extends BlockListValue<infer T, infer V> ? {[K in T]: BlockCaseProps<V>} : never
>

const BlockListStyle = cssRule({
  width: '100%'
})

export interface BlockListItemProps<T extends string = string, V = any> {
  readonly index: number
  readonly value: BlockListValue<T, V>
  readonly icon: IconType
  readonly onChange: (index: number, value: React.SetStateAction<BlockListValue<T, V>>) => void
  readonly onDelete: (index: number) => void
  readonly onMoveUp?: (index: number) => void
  readonly onMoveDown?: (index: number) => void
  readonly children: (props: BlockProps<V>) => JSX.Element
}

function BlockListItem({
  index,
  value,
  icon,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  children
}: BlockListItemProps) {
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

export interface BlockListProps<V extends BlockListValue> extends BlockProps<V[]> {
  readonly children: BlockCaseMapForValue<V>
}

export function BlockList<V extends BlockListValue>({
  value: values,
  children,
  onChange
}: BlockListProps<V>) {
  const unionFieldMap = children as BlockCaseMap
  const css = useStyle()

  function handleItemChange(index: number, itemValue: React.SetStateAction<BlockListValue>) {
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

      valuesCopy.splice(index, 0, {
        id: nanoid(),
        type,
        value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue
      } as V)

      return valuesCopy
    })
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
      <Box
        paddingLeft={Spacing.Medium}
        paddingRight={Spacing.Medium}
        marginTop={Spacing.ExtraSmall}
        marginBottom={Spacing.ExtraSmall}>
        <AddBlockInput
          menuItems={Object.entries(unionFieldMap).map(([type, {icon, label}]) => ({
            id: type,
            icon,
            label
          }))}
          onMenuItemClick={({id}) => handleAdd(index, id)}
        />
      </Box>
    )
  }

  function listItemForIndex(value: V, index: number) {
    const hasPrevIndex = index - 1 >= 0
    const hasNextIndex = index + 1 < values.length

    const unionCase = unionFieldMap[value.type]

    return (
      <Fragment key={value.id}>
        <BlockListItem
          index={index}
          value={value}
          icon={unionCase.icon}
          onDelete={handleRemove}
          onChange={handleItemChange}
          onMoveUp={hasPrevIndex ? handleMoveUp : undefined}
          onMoveDown={hasNextIndex ? handleMoveDown : undefined}>
          {unionCase.field}
        </BlockListItem>
        {addButtonForIndex(index + 1)}
      </Fragment>
    )
  }

  return (
    <div className={css(BlockListStyle)}>
      {addButtonForIndex(0)}
      {values.map((value, index) => listItemForIndex(value, index))}
    </div>
  )
}
