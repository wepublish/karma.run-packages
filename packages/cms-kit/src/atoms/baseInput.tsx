import React from 'react'
import {cssRuleWithTheme, useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'
import {toArray} from '../utility'

export const BaseInputStyle = cssRuleWithTheme(({theme}) => ({
  border: 'none',

  '&::placeholder': {
    color: theme.colors.gray
  },

  '&:focus': {
    outline: 'none'
  }
}))

export interface InputProps {
  readonly value?: string
  readonly placeholder?: string
  readonly type?: string
  onChange?(value: string, event: React.ChangeEvent<HTMLInputElement>): void
}

export interface BaseInputProps<P = undefined> extends InputProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseInputPropsWithoutStyleProps extends InputProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseInputPropsWithStyleProps<P = undefined> extends InputProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export function BaseInput(props: BaseInputPropsWithoutStyleProps): JSX.Element
export function BaseInput<P = undefined>(props: BaseInputPropsWithStyleProps<P>): JSX.Element
export function BaseInput<P = undefined>({
  placeholder,
  value,
  onChange,
  style,
  styleProps
}: BaseInputProps<P>): JSX.Element {
  const {css} = useThemeStyle(styleProps)

  return (
    <input
      className={css(BaseInputStyle, ...toArray(style))}
      placeholder={placeholder}
      value={value}
      onChange={event => {
        if (onChange) onChange(event.target.value, event)
      }}
    />
  )
}
