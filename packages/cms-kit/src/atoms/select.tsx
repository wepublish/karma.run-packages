import React from 'react'
import {CSSRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {toArray} from '../utility'

export interface SelectProps {
  readonly id?: string
  readonly type?: string
  readonly checked?: boolean
  onSelectChange(value: SelectChangeEvent): void
}

export interface BaseSelectProps<P = undefined> extends SelectProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseSelectPropsWithoutStyleProps extends SelectProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseSelectPropsWithStyleProps<P = undefined> extends SelectProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export interface SelectChangeEvent {
  id?: string
  isChecked: boolean
  event: React.ChangeEvent<HTMLInputElement>
}

export function Select(props: BaseSelectPropsWithoutStyleProps): JSX.Element
export function Select<P = undefined>(props: BaseSelectPropsWithStyleProps<P>): JSX.Element
export function Select<P = undefined>({
  id,
  type,
  checked,
  style,
  styleProps,
  onSelectChange
}: BaseSelectProps<P>): JSX.Element {
  const {css} = useThemeStyle(styleProps)

  return (
    <input
      id={id}
      type={type}
      checked={checked}
      onChange={onChange}
      className={css(...toArray(style))}
    />
  )

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (id) {
      onSelectChange({
        id: id,
        isChecked: event.target.checked,
        event: event
      })
    } else {
      onSelectChange({
        isChecked: event.target.checked,
        event: event
      })
    }
  }
}
