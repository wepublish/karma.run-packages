import React, {MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export interface ButtonProps
  extends Omit<AnchorHTMLAttributes<any>, 'type'>,
    ButtonHTMLAttributes<any> {
  title: string
}

export const ButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.primary,

  '&:hover': {
    backgroundColor: theme.colors.primaryDark
  }
}))

export function Button({title, href, onClick, className, ...rest}: ButtonProps) {
  const {css} = useThemeStyle({title})
  const Element = href ? 'a' : 'button'

  return (
    <Element
      {...rest}
      href={href}
      onClick={onClick}
      className={joinClassNames(css(ButtonStyle), className)}>
      {title}
    </Element>
  )
}
