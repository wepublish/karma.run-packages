import React, {ReactNode, MouseEventHandler} from 'react'

import {useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'
import {toArray} from '../utility'
import {cssRule} from '@karma.run/react'

export interface ButtonProps {
  readonly href?: string
  readonly rel?: string
  readonly title?: string
  readonly children?: ReactNode
  readonly onClick?: MouseEventHandler
  readonly disabled?: boolean
}

export interface BaseButtonProps<P = undefined> extends ButtonProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseButtonPropsWithoutStyleProps extends ButtonProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseButtonPropsWithStyleProps<P = undefined> extends ButtonProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export const BaseButtonStyle = cssRule({
  display: 'inline-block',
  overflow: 'hidden',

  cursor: 'pointer',
  fontSize: 'inherit',

  padding: 0,
  margin: 0,

  border: 'none',
  backgroundColor: 'transparent',

  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',

  '&:disabled': {
    cursor: 'default'
  }
})

export function BaseButton(props: BaseButtonPropsWithoutStyleProps): JSX.Element
export function BaseButton<P = undefined>(props: BaseButtonPropsWithStyleProps<P>): JSX.Element
export function BaseButton<P = undefined>({
  href,
  rel,
  title,
  onClick,
  styleProps,
  style,
  children,
  disabled
}: BaseButtonProps<P>): JSX.Element {
  const {css} = useThemeStyle(styleProps)
  const Element = href ? 'a' : 'button'

  return (
    <Element
      href={href}
      rel={rel}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={css(BaseButtonStyle, ...toArray(style))}>
      {children}
    </Element>
  )
}
