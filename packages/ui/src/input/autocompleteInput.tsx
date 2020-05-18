import React, {ReactNode, KeyboardEvent} from 'react'
import {styled} from '@karma.run/react'
import Downshift, {UseSelectPropGetters, ControllerStateAndHelpers} from 'downshift'
import {themeMiddleware, Theme} from '../style/themeContext'

import {
  FontSize,
  TransitionDuration,
  LineHeight,
  Spacing,
  MarginProps,
  extractStyleProps,
  WidthProps,
  FlexChildProps
} from '../style/helpers'

import {Chip} from '../data/chip'
import {MaterialIconClose} from '@karma.run/icons'

interface AutocompleteInputStyleProps {
  hasError: boolean
  theme: Theme
}

interface AutocompleteInputLayoutProps extends MarginProps, WidthProps, FlexChildProps {}

const AutocompleteInputWrapper = styled('div', (props: AutocompleteInputLayoutProps) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInput' : undefined,

  position: 'relative',
  paddingTop: 16,

  ...props
}))

const AutocompleteInputLabelWrapper = styled(
  'label',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInputLabelWrapper' : undefined,

    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.gray}`,

    fontSize: FontSize.Medium,
    fill: theme.colors.dark
  }),
  themeMiddleware
)

const AutocompleteInputLabel = styled(
  'span',
  ({hasError, theme}: AutocompleteInputStyleProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInputLabel' : undefined,

    color: hasError ? theme.colors.alert : theme.colors.gray,

    position: 'absolute',
    top: -FontSize.Medium,
    left: 0,

    fontSize: FontSize.Small,
    opacity: 1,

    transform: 'translateY(0%)',
    transitionProperty: 'transform, opacity, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

const AutocompleteInputElement = styled(
  'input',
  ({theme}: AutocompleteInputStyleProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInputElement' : undefined,

    flexGrow: 1,

    color: theme.colors.dark,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: LineHeight.Default,

    border: 'none',
    backgroundColor: 'transparent',

    transitionProperty: 'border-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':focus:valid': {
      borderColor: theme.colors.action
    },

    ':focus:valid + span': {
      color: theme.colors.action
    },

    ':focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':focus:invalid + span': {
      color: theme.colors.alert
    },

    ':invalid': {
      borderColor: theme.colors.alert
    },

    ':disabled': {
      opacity: 0.5,
      borderBottomStyle: 'dashed'
    },

    ':invalid + span': {
      color: theme.colors.alert
    },

    ':placeholder-shown + span': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + span': {
      color: theme.colors.action
    }
  }),
  themeMiddleware
)

const AutocompleteInputInfo = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInputInfo' : undefined,

    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const AutocompleteInputError = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'AutocompleteInputError' : undefined,

    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface AutocompleteInputListProps {
  isOpen: boolean

  inputValue: string | null
  highlightedIndex: number | null

  getMenuProps: UseSelectPropGetters<any>['getMenuProps']
  getItemProps: UseSelectPropGetters<any>['getItemProps']
}

export interface ChipData {
  id: string
  imageURL?: string
  label: string
}

export interface AutocompleteInputProps<T> extends MarginProps, WidthProps, FlexChildProps {
  label?: string
  description?: string
  errorMessage?: string
  value: T[]
  disabled?: boolean

  valueToChipData: (value: T) => ChipData
  onChange: (value?: T[]) => void
  children: (props: AutocompleteInputListProps) => ReactNode
}

export function AutocompleteInput<T>({
  label,
  description,
  errorMessage,
  value,
  children,
  valueToChipData: valueToTag,
  onChange,
  ...props
}: AutocompleteInputProps<T>) {
  const styleProps = {hasError: errorMessage != undefined}
  const [layoutProps] = extractStyleProps(props)

  function handleChange(selectedItem: T | null, downshift: ControllerStateAndHelpers<T>) {
    downshift.reset()
    if (selectedItem) {
      onChange([...value, selectedItem])
    }
  }

  function handleRemove(removeIndex: number) {
    onChange(value.filter((value, index) => index !== removeIndex))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !e.currentTarget.value) {
      if (value.length) onChange(value.slice(0, value.length - 1))
    }
  }

  return (
    <Downshift selectedItem={null} onChange={handleChange}>
      {({
        getRootProps,
        getMenuProps,
        getItemProps,
        getInputProps,
        getLabelProps,
        isOpen,
        highlightedIndex,
        inputValue
      }) => (
        <AutocompleteInputWrapper styleProps={layoutProps} {...getRootProps()}>
          <AutocompleteInputLabelWrapper {...getLabelProps()}>
            {value?.map((value, index) => {
              const {id, imageURL, label} = valueToTag(value)
              return (
                <Chip
                  key={id}
                  imageURL={imageURL}
                  label={label}
                  margin={Spacing.ExtraTiny}
                  icon={MaterialIconClose}
                  onIconClick={() => handleRemove(index)}
                />
              )
            })}
            <AutocompleteInputElement
              placeholder={value?.length ? undefined : label}
              styleProps={styleProps}
              {...getInputProps({
                onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)
              } as any)}
            />
            <AutocompleteInputLabel styleProps={styleProps}>{label}</AutocompleteInputLabel>
          </AutocompleteInputLabelWrapper>

          {children({
            isOpen,
            inputValue,
            highlightedIndex,
            getMenuProps,
            getItemProps
          })}

          {description && <AutocompleteInputInfo>{description}</AutocompleteInputInfo>}
          {errorMessage && <AutocompleteInputError>{errorMessage}</AutocompleteInputError>}
        </AutocompleteInputWrapper>
      )}
    </Downshift>
  )
}
