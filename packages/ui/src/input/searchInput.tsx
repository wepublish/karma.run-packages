import React, {forwardRef, InputHTMLAttributes} from 'react'
import {styled} from '@karma.run/react'

import {
  BorderRadius,
  BorderWidth,
  FontSize,
  Spacing,
  MarginProps,
  FlexChildProps,
  WidthProps,
  extractStyleProps
} from '../style/helpers'

import {themeMiddleware, Theme} from '../style/themeContext'

interface SearchInputElementProps extends MarginProps, WidthProps, FlexChildProps {
  theme: Theme
}

const SearchInputElement = styled(
  'input',
  ({theme, width, ...props}: SearchInputElementProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'SearchInput' : undefined,

    appearance: 'none',
    display: 'block',
    width: width ?? '100%',

    padding: `${Spacing.ExtraSmall} ${Spacing.Small}`,

    color: theme.colors.dark,
    fontSize: FontSize.Medium,

    borderRadius: BorderRadius.Medium,
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.gray,
    borderStyle: 'solid',
    backgroundColor: theme.colors.white,

    ...props,

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    }
  }),
  themeMiddleware
)

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  props,
  ref
) {
  const [styleProps, elementProps] = extractStyleProps(props)
  return <SearchInputElement type="search" ref={ref} {...elementProps} styleProps={styleProps} />
})
