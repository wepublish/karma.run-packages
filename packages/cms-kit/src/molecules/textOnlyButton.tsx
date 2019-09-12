import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const TextOnlyButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  border: 'none',
  color: theme.colors.action,

  '&:hover': {
    backgroundColor: theme.colors.light
  },
  '&:active': {
    backgroundColor: theme.colors.actionDark
  },
  '&:disabled': {
    backgroundColor: theme.colors.light,
    color: theme.colors.gray
  }
}))

export interface TextOnlyButtonProps extends ButtonProps {
  readonly label: string
}

export function TextOnlyButton({label, href, onClick, ...rest}: TextOnlyButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(TextOnlyButtonStyle)} {...rest}>
      {label}
    </Button>
  )
}
