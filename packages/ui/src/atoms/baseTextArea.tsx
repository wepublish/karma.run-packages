import React from 'react'
import {toArray} from '@karma.run/utility'

import {cssRuleWithTheme, useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'
import {pxToRem, FontSize} from '../style/helpers'

export const BaseTextAreaStyle = cssRuleWithTheme(({theme}) => ({
  fontSize: pxToRem(FontSize.Medium),
  width: '100%',
  border: 'none',

  '&::placeholder': {
    color: theme.colors.gray
  },

  '&:focus': {
    outline: 'none'
  }
}))

export interface TextAreaProps {
  readonly value?: string
  readonly placeholder?: string
  readonly type?: string
  onChange?(value: string, event: React.ChangeEvent<HTMLTextAreaElement>): void
  onSelect?(value: string, event: React.SyntheticEvent<HTMLTextAreaElement>): void
}

export interface BaseTextAreaProps<P = undefined> extends TextAreaProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseTextAreaPropsWithoutStyleProps extends TextAreaProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseTextAreaPropsWithStyleProps<P = undefined> extends TextAreaProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export function BaseTextArea(props: BaseTextAreaPropsWithoutStyleProps): JSX.Element
export function BaseTextArea<P = undefined>(props: BaseTextAreaPropsWithStyleProps<P>): JSX.Element
export function BaseTextArea<P = undefined>({
  placeholder,
  value,
  onChange,
  onSelect,
  style,
  styleProps
}: BaseTextAreaProps<P>): JSX.Element {
  const css = useThemeStyle(styleProps)

  return (
    <textarea
      className={css(BaseTextAreaStyle, ...toArray(style))}
      placeholder={placeholder}
      value={value}
      onChange={event => {
        if (onChange) onChange(event.currentTarget.value, event)
      }}
      onSelect={event => {
        if (onSelect) onSelect(event.currentTarget.value, event)
      }}
    />
  )
}
