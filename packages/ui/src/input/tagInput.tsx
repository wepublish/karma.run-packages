import React, {KeyboardEvent, useState} from 'react'
import {styled} from '@karma.run/react'
import {MaterialIconClose} from '@karma.run/icons'
import {UseSelectPropGetters} from 'downshift'

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

interface TagInputStyleProps {
  readonly hasError: boolean
  readonly isPlaceholderShown: boolean
  readonly theme: Theme
}

interface TagInputLayoutProps extends MarginProps, WidthProps, FlexChildProps {}

const TagInputWrapper = styled('div', (props: TagInputLayoutProps) => ({
  position: 'relative',
  paddingTop: 16,
  ...props
}))

const TagInputLabelWrapper = styled(
  'div',
  ({theme}) => ({
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

const TagInputLabel = styled(
  'label',
  ({hasError, isPlaceholderShown, theme}: TagInputStyleProps) => ({
    color: hasError ? theme.colors.alert : theme.colors.grayDark,
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

const TagInputElement = styled(
  'input',
  ({theme}: TagInputStyleProps) => ({
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
    }
  }),
  themeMiddleware
)

const TagInputInfo = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const TagInputError = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface TagInputListProps {
  readonly isOpen: boolean

  readonly inputValue: string | null
  readonly highlightedIndex: number | null

  readonly getMenuProps: UseSelectPropGetters<any>['getMenuProps']
  readonly getItemProps: UseSelectPropGetters<any>['getItemProps']
}

export interface TagData {
  readonly imageURL?: string
  readonly label: string
}

export interface TagInputProps extends MarginProps, WidthProps, FlexChildProps {
  readonly label?: string
  readonly description?: string
  readonly errorMessage?: string
  readonly value: string[]
  readonly disabled?: boolean

  onChange(value?: string[]): void
}

export function TagInput<T>({
  label,
  description,
  errorMessage,
  value,
  onChange,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [layoutProps] = extractStyleProps(props)

  const styleProps = {
    hasError: errorMessage != undefined,
    isPlaceholderShown: !value.length && !inputValue
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const newValue = inputValue.trim()

      if (newValue) {
        onChange([...value, newValue])
        setInputValue('')
      }
    }

    if (e.key === 'Backspace' && !e.currentTarget.value) {
      if (value.length) onChange(value.slice(0, value.length - 1))
    }
  }

  function handleRemove(removeIndex: number) {
    onChange(value.filter((value, index) => index !== removeIndex))
  }

  function handleBlur() {
    const newValue = inputValue.trim()

    if (newValue) {
      onChange([...value, inputValue])
      setInputValue('')
    }
  }

  return (
    <TagInputWrapper styleProps={layoutProps}>
      <TagInputLabelWrapper>
        {value?.map((value, index) => (
          <Chip
            label={value}
            margin={Spacing.ExtraTiny}
            icon={MaterialIconClose}
            onIconClick={() => handleRemove(index)}
          />
        ))}
        <TagInputElement
          value={inputValue}
          placeholder={value?.length ? undefined : label}
          styleProps={styleProps}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
        <TagInputLabel styleProps={styleProps}>{label}</TagInputLabel>
      </TagInputLabelWrapper>

      {description && <TagInputInfo>{description}</TagInputInfo>}
      {errorMessage && <TagInputError>{errorMessage}</TagInputError>}
    </TagInputWrapper>
  )
}
