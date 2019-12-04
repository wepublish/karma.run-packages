import React, {ReactNode, useState} from 'react'
import {cssRule, styled} from '@karma.run/react'

import {useSelect} from 'downshift'

import {IconElement, Icon} from '../data/icon'
import {themeMiddleware, Theme} from '../style/themeContext'

import {
  FontSize,
  TransitionDuration,
  LineHeight,
  Spacing,
  MarginProps,
  WidthProps,
  FlexChildProps,
  BorderRadius,
  ZIndex
} from '../style/helpers'

import {MaterialIconKeyboardArrowDown, MaterialIconKeyboardArrowUp} from '@karma.run/icons'

// TODO: Shares a lot of code with TextInput and TypographicTextArea, try deduplicate some stuff.
interface SelectStyleProps {
  readonly hasFocus: boolean
  readonly hasError: boolean
  readonly hasIcon: boolean
  readonly isPlaceholderShown: boolean
  readonly isOpen: boolean
  readonly theme: Theme
}

interface SelectLayoutProps extends MarginProps, WidthProps, FlexChildProps {}

const IconStyle = cssRule(() => ({
  position: 'absolute'
}))

const ArrowIconStyle = cssRule(() => ({
  position: 'absolute',
  right: 0
}))

const SelectWrapper = styled('div', (props: SelectLayoutProps) => ({
  position: 'relative',
  paddingTop: 16,
  ...props
}))

const SelectLabelWrapper = styled(
  'label',
  ({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    fontSize: FontSize.Medium,
    fill: theme.colors.dark
  }),
  themeMiddleware
)

const SelectLabel = styled(
  'span',
  ({hasFocus, hasError, isPlaceholderShown, theme}: SelectStyleProps) => ({
    color: hasError ? theme.colors.alert : hasFocus ? theme.colors.action : theme.colors.gray,
    position: 'absolute',
    top: -FontSize.Medium,
    left: 0,
    fontSize: FontSize.Small,
    opacity: isPlaceholderShown ? 0 : 1,
    transform: isPlaceholderShown ? 'translateY(30%)' : 'translateY(0%)',
    transitionProperty: 'transform, opacity, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

const SelectElement = styled(
  'button',
  ({hasFocus, hasIcon, isPlaceholderShown, theme}: SelectStyleProps) => ({
    width: '100%',
    padding: 0,

    cursor: 'pointer',
    userSelect: 'none',
    color: isPlaceholderShown ? theme.colors.gray : theme.colors.dark,
    textAlign: 'left',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: LineHeight.Default,

    border: 'none',
    borderBottom: `1px solid ${theme.colors.gray}`,
    borderColor: hasFocus ? theme.colors.action : undefined,
    backgroundColor: 'transparent',

    transitionProperty: 'border-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    paddingLeft: hasIcon ? FontSize.Medium + Spacing.Tiny : 0,
    paddingRight: FontSize.Medium + Spacing.Tiny,

    ':focus': {
      outline: 'none'
    },

    ':disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
      borderBottomStyle: 'dashed'
    }
  }),
  themeMiddleware
)

const SelectList = styled(
  'ul',
  ({theme}) => ({
    overflow: 'auto',

    position: 'absolute',
    zIndex: ZIndex.Tooltip,

    cursor: 'pointer',
    userSelect: 'none',
    width: '100%',
    maxHeight: 300,
    margin: 0,
    padding: 0,

    fontSize: FontSize.Medium,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: BorderRadius.Small,
    borderBottomRightRadius: BorderRadius.Small,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',

    ':focus': {
      outline: 'none'
    }
  }),
  themeMiddleware
)

interface SelectListItemProps {
  readonly isHighlighted: boolean
  readonly theme: Theme
}

const SelectListItem = styled(
  'li',
  ({isHighlighted, theme}: SelectListItemProps) => ({
    listStyle: 'none',
    padding: `${Spacing.Tiny}px ${Spacing.ExtraSmall}px`,
    backgroundColor: isHighlighted ? theme.colors.grayLight : undefined
  }),
  themeMiddleware
)

const SelectInfo = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const SelectError = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface SelectOption {
  readonly id: string
}

export interface SelectProps<T extends SelectOption>
  extends MarginProps,
    WidthProps,
    FlexChildProps {
  readonly options: T[]
  readonly value?: T
  readonly label?: string
  readonly description?: string
  readonly errorMessage?: string
  readonly icon?: IconElement
  readonly disabled?: boolean

  renderListItem(value: T): ReactNode
  renderSelectedItem?(value: T): ReactNode

  onChange?(value?: T): void
}

export function Select<T extends SelectOption>({
  options,
  label,
  description,
  errorMessage,
  icon,
  disabled,
  value,
  renderListItem,
  renderSelectedItem,
  onChange,
  ...props
}: SelectProps<T>) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items: options,
    selectedItem: value,
    onSelectedItemChange: onChange ? ({selectedItem}) => onChange(selectedItem) : undefined
  })

  const [hasFocus, setFocus] = useState(false)

  const styleProps = {
    hasFocus,
    hasError: errorMessage != undefined,
    hasIcon: icon != undefined,
    isPlaceholderShown: selectedItem == undefined,
    isOpen
  }

  return (
    <SelectWrapper styleProps={props}>
      <SelectLabelWrapper {...getLabelProps()}>
        {icon && <Icon element={icon} style={IconStyle} />}
        <SelectElement styleProps={styleProps} {...getToggleButtonProps()} disabled={disabled}>
          {selectedItem
            ? renderSelectedItem
              ? renderSelectedItem(selectedItem)
              : renderListItem(selectedItem)
            : label}
        </SelectElement>
        <Icon
          element={isOpen ? MaterialIconKeyboardArrowUp : MaterialIconKeyboardArrowDown}
          style={ArrowIconStyle}
        />
        <SelectLabel styleProps={styleProps}>{label}</SelectLabel>
      </SelectLabelWrapper>
      <SelectList {...getMenuProps()} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
        {isOpen &&
          options.map((option, index) => (
            <SelectListItem
              key={option.id}
              styleProps={{isHighlighted: highlightedIndex === index}}
              {...getItemProps({item: option, index})}>
              {renderListItem(option)}
            </SelectListItem>
          ))}
      </SelectList>

      {description && <SelectInfo>{description}</SelectInfo>}
      {errorMessage && <SelectError>{errorMessage}</SelectError>}
    </SelectWrapper>
  )
}
