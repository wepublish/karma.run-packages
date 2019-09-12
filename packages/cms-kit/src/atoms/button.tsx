import React, {MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export interface ButtonProps
  extends Omit<AnchorHTMLAttributes<any>, 'type'>,
    ButtonHTMLAttributes<any> {}

export const ButtonStyle = cssRuleWithTheme(({theme}) => ({
  cursor: 'pointer'
}))

export function Button({
  href,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps & {children: string | JSX.Element}) {
  const {css} = useThemeStyle()
  const Element = href ? 'a' : 'button'

  return (
    <Element
      {...rest}
      href={href}
      onClick={onClick}
      className={joinClassNames(css(ButtonStyle), className)}>
      {children}
    </Element>
  )
}
