import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

export interface ButtonProps {
  title: string
}

const buttonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.primary,

  '&:hover': {
    backgroundColor: theme.colors.primaryDark
  }
}))

export function Button({title}: ButtonProps) {
  const {css} = useThemeStyle({title})

  return <div className={css(buttonStyle)}>{title}</div>
}
