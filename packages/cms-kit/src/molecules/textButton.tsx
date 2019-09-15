import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const TextButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.primary,
  border: 'none',
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.white,

  '&:hover': {
    backgroundImage: `linear-gradient(254deg, ${theme.colors.primaryDark}, ${theme.colors.primary})`
  },
  '&:active': {
    backgroundColor: theme.colors.primaryDark
  },
  '&:disabled': {
    backgroundColor: theme.colors.grayLight,
    color: theme.colors.gray
  }
}))

export interface TextButtonProps extends ButtonProps {
  readonly label: string
}

export function TextButton({label, href, onClick, ...rest}: TextButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(TextButtonStyle)}>
      {label}
    </Button>
  )
}
