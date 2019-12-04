import React, {Fragment, useState, ReactNode} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, useStyle, cssRule} from '@karma.run/react'
import {isValueConstructor, ValueConstructor, UnionToIntersection} from '@karma.run/utility'

import {BlockProps, BlockConstructorFn} from './block'

import {IconElement, Icon} from '../data/icon'
import {AddBlockInput} from '../input/addBlockInput'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {IconButton} from '../buttons/iconButton'
import {
  MaterialIconDeleteOutlined,
  MaterialIconKeyboardArrowUp,
  MaterialIconKeyboardArrowDown
} from '@karma.run/icons'
import {Card} from '../data/card'

export interface BlockCaseProps<V = any> {
  readonly label: string
  readonly icon: IconElement
  readonly defaultValue: ValueConstructor<V>
  readonly field: BlockConstructorFn<V>
}

export interface BlockListValue<T extends string = string, V = any> {
  readonly key: string
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
  readonly icon: IconElement
  readonly autofocus: boolean
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
  autofocus,
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
      {children({value: value.value, onChange: handleValueChange, autofocus})}
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
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const css = useStyle()

  const unionFieldMap = children as BlockCaseMap

  function handleItemChange(index: number, itemValue: React.SetStateAction<BlockListValue>) {
    onChange(value =>
      Object.assign([], value, {
        [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
      })
    )
  }

  function handleAdd(index: number, type: string) {
    setFocusIndex(index)
    onChange(values => {
      const {defaultValue} = unionFieldMap[type]
      const valuesCopy = values.slice()

      valuesCopy.splice(index, 0, {
        key: nanoid(),
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
          subtle={index !== values.length}
        />
      </Box>
    )
  }

  function listItemForIndex(value: V, index: number) {
    const hasPrevIndex = index - 1 >= 0
    const hasNextIndex = index + 1 < values.length

    const unionCase = unionFieldMap[value.type]

    return (
      <Fragment key={value.key}>
        <BlockListItem
          index={index}
          value={value}
          icon={unionCase.icon}
          onDelete={handleRemove}
          onChange={handleItemChange}
          onMoveUp={hasPrevIndex ? handleMoveUp : undefined}
          onMoveDown={hasNextIndex ? handleMoveDown : undefined}
          autofocus={focusIndex === index}>
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

const ListItemWrapperStyle = cssRule({
  display: 'flex',
  width: '100%'
})

const ListItemWrapperActionStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  marginRight: Spacing.ExtraSmall
})

const ListItemWrapperAccessoryStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: Spacing.ExtraSmall,
  fontSize: 24,
  fill: theme.colors.gray
}))

const ListItemWrapperContentStyle = cssRule({
  display: 'flex',
  width: '100%'
})

interface ListItemWrapperProps {
  readonly children?: ReactNode
  readonly accessory?: ReactNode // TODO
  readonly icon?: IconElement

  onDelete?(): void
  onMoveUp?(): void
  onMoveDown?(): void
}

function ListItemWrapper({children, icon, onDelete, onMoveUp, onMoveDown}: ListItemWrapperProps) {
  const css = useThemeStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <IconButton
          title="Delete"
          icon={MaterialIconDeleteOutlined}
          onClick={onDelete}
          disabled={onDelete == null}
        />
        <Box flexGrow={1} />
        <Box marginTop={Spacing.ExtraSmall} marginBottom={Spacing.Tiny}>
          <IconButton
            title="Move Up"
            icon={MaterialIconKeyboardArrowUp}
            onClick={onMoveUp}
            disabled={onMoveUp == null}
          />
        </Box>
        <Box marginBottom={Spacing.ExtraSmall}>
          <IconButton
            title="Move Down"
            icon={MaterialIconKeyboardArrowDown}
            onClick={onMoveDown}
            disabled={onMoveDown == null}
          />
        </Box>
        <Box flexGrow={1} />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card width="100%">
          <Box padding={Spacing.Small} minHeight="100%">
            {children}
          </Box>
        </Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon element={icon} />}</div>
    </div>
  )
}
