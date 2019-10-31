import React, {ChangeEvent} from 'react'
import {toArray} from '@karma.run/utility'

import {CSSRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule} from '@karma.run/react'

export enum InputType {
  Text = 'text',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Search = 'search',
  Tel = 'tel',
  Url = 'url'
}

export type ValueTypeForInputType<T extends InputType> = T extends InputType.Text
  ? string
  : T extends InputType.Checkbox | InputType.Radio
  ? boolean
  : never

export interface InputProps<T extends InputType> {
  readonly type: T

  readonly name?: string
  readonly value?: string
  readonly checked?: boolean
  readonly placeholder?: string
  readonly disabled?: boolean

  onChange?(event: ChangeEvent<HTMLInputElement>): void
}

export interface BaseInputProps<T extends InputType, P = undefined> extends InputProps<T> {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseInputPropsWithoutStyleProps<T extends InputType> extends InputProps<T> {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseInputPropsPropsWithStyleProps<T extends InputType, P = undefined>
  extends InputProps<T> {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

const BaseInputStyle = cssRule(() => ({
  border: 'none',
  fontSize: 'inherit'
}))

export function BaseInput<T extends InputType>(
  props: BaseInputPropsWithoutStyleProps<T>
): JSX.Element
export function BaseInput<T extends InputType, P = undefined>(
  props: BaseInputPropsPropsWithStyleProps<T, P>
): JSX.Element
export function BaseInput<T extends InputType, P = undefined>({
  type,
  style,
  styleProps,
  ...props
}: BaseInputProps<T, P>): JSX.Element {
  const css = useThemeStyle(styleProps)
  return <input {...props} type={type} className={css(BaseInputStyle, ...toArray(style))} />
}
