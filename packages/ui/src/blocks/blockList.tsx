import React, {Fragment, useState, ReactNode, useCallback, useMemo, memo} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, useStyle, cssRule} from '@karma.run/react'
import {isValueConstructor, ValueConstructor, UnionToIntersection} from '@karma.run/utility'

import {
  MaterialIconDeleteOutlined,
  MaterialIconKeyboardArrowUp,
  MaterialIconKeyboardArrowDown
} from '@karma.run/icons'

import {BlockProps, BlockConstructorFn} from './block'

import {IconElement, Icon} from '../data/icon'
import {AddBlockInput} from '../input/addBlockInput'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {IconButton} from '../buttons/iconButton'
import {Card} from '../data/card'

export interface BlockCaseProps<V = any> {
  label: string
  icon: IconElement
  defaultValue: ValueConstructor<V>
  field: BlockConstructorFn<V>
}

export interface BlockListValue<T extends string = string, V = any> {
  key: string
  type: T
  value: V
}

export type BlockMap = Record<string, BlockCaseProps>

export type BlockMapForValue<R extends BlockListValue> = UnionToIntersection<
  R extends BlockListValue<infer T, infer V> ? {[K in T]: BlockCaseProps<V>} : never
>

const BlockListStyle = cssRule({
  width: '100%'
})

export interface BlockListItemProps<T extends string = string, V = any> {
  index: number
  value: BlockListValue<T, V>
  icon: IconElement
  autofocus: boolean
  disabled?: boolean

  onChange: (index: number, value: React.SetStateAction<BlockListValue<T, V>>) => void
  onDelete: (index: number) => void
  onMoveUp?: (index: number) => void
  onMoveDown?: (index: number) => void
  children: (props: BlockProps<V>) => JSX.Element
}

const BlockListItem = memo(function BlockListItem({
  index,
  value,
  icon,
  autofocus,
  disabled,
  children,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown
}: BlockListItemProps) {
  const handleValueChange = useCallback(
    (fieldValue: React.SetStateAction<any>) => {
      onChange(index, value => ({
        ...value,
        value: isFunctionalUpdate(fieldValue) ? fieldValue(value.value) : fieldValue
      }))
    },
    [onChange, index]
  )

  return (
    <ListItemWrapper
      icon={icon}
      disabled={disabled}
      onDelete={() => onDelete(index)}
      onMoveUp={onMoveUp ? () => onMoveUp(index) : undefined}
      onMoveDown={onMoveDown ? () => onMoveDown(index) : undefined}>
      {children({value: value.value, onChange: handleValueChange, autofocus, disabled})}
    </ListItemWrapper>
  )
})

export function useBlockMap<V extends BlockListValue>(
  map: () => BlockMapForValue<V>,
  deps: ReadonlyArray<any> | undefined
) {
  return useMemo(map, deps)
}

export interface BlockListProps<V extends BlockListValue> extends BlockProps<V[]> {
  children: BlockMapForValue<V>
}

export function BlockList<V extends BlockListValue>({
  value: values,
  children,
  disabled,
  onChange
}: BlockListProps<V>) {
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const css = useStyle()

  const blockMap = children as BlockMap

  const handleItemChange = useCallback(
    (index: number, itemValue: React.SetStateAction<BlockListValue>) => {
      onChange(value =>
        Object.assign([], value, {
          [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
        })
      )
    },
    [onChange]
  )

  const handleAdd = useCallback(
    (index: number, type: string) => {
      setFocusIndex(index)
      onChange(values => {
        const {defaultValue} = blockMap[type]
        const valuesCopy = values.slice()

        valuesCopy.splice(index, 0, {
          key: nanoid(),
          type,
          value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue
        } as V)

        return valuesCopy
      })
    },
    [blockMap, onChange]
  )

  const handleRemove = useCallback(
    (itemIndex: number) => {
      onChange(value => value.filter((value, index) => index !== itemIndex))
    },
    [onChange]
  )

  const handleMoveIndex = useCallback(
    (from: number, to: number) => {
      onChange(values => {
        const valuesCopy = values.slice()
        const [value] = valuesCopy.splice(from, 1)

        valuesCopy.splice(to, 0, value)

        return valuesCopy
      })
    },
    [onChange]
  )

  const handleMoveUp = useCallback(
    (index: number) => {
      handleMoveIndex(index, index - 1)
    },
    [handleMoveIndex]
  )

  const handleMoveDown = useCallback(
    (index: number) => {
      handleMoveIndex(index, index + 1)
    },
    [handleMoveIndex]
  )

  function addButtonForIndex(index: number) {
    return (
      <Box
        paddingLeft={Spacing.Medium}
        paddingRight={Spacing.Medium}
        marginTop={Spacing.ExtraSmall}
        marginBottom={Spacing.ExtraSmall}>
        <AddBlockInput
          menuItems={Object.entries(blockMap).map(([type, {icon, label}]) => ({
            id: type,
            icon,
            label
          }))}
          onMenuItemClick={({id}) => handleAdd(index, id)}
          subtle={index !== values.length || disabled}
          disabled={disabled}
        />
      </Box>
    )
  }

  function listItemForIndex(value: V, index: number) {
    const hasPrevIndex = index - 1 >= 0
    const hasNextIndex = index + 1 < values.length
    const blockDef = blockMap[value.type]

    return (
      <Fragment key={value.key}>
        <BlockListItem
          index={index}
          value={value}
          icon={blockDef.icon}
          onDelete={handleRemove}
          onChange={handleItemChange}
          onMoveUp={hasPrevIndex ? handleMoveUp : undefined}
          onMoveDown={hasNextIndex ? handleMoveDown : undefined}
          autofocus={focusIndex === index}
          disabled={disabled}>
          {blockDef.field}
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
  children?: ReactNode
  icon?: IconElement
  disabled?: boolean

  onDelete?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

function ListItemWrapper({
  children,
  icon,
  disabled,
  onDelete,
  onMoveUp,
  onMoveDown
}: ListItemWrapperProps) {
  const css = useThemeStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <IconButton
          title="Delete"
          icon={MaterialIconDeleteOutlined}
          onClick={onDelete}
          disabled={onDelete == null || disabled}
        />
        <Box flexGrow={1} />
        <Box marginTop={Spacing.ExtraSmall} marginBottom={Spacing.Tiny}>
          <IconButton
            title="Move Up"
            icon={MaterialIconKeyboardArrowUp}
            onClick={onMoveUp}
            disabled={onMoveUp == null || disabled}
          />
        </Box>
        <Box marginBottom={Spacing.ExtraSmall}>
          <IconButton
            title="Move Down"
            icon={MaterialIconKeyboardArrowDown}
            onClick={onMoveDown}
            disabled={onMoveDown == null || disabled}
          />
        </Box>
        <Box flexGrow={1} />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card width="100%">
          <Box padding={Spacing.Small}>{children}</Box>
        </Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon element={icon} />}</div>
    </div>
  )
}
