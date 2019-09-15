import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const OutlineTextButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.action,
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.action,

  '&:hover': {
    backgroundColor: theme.colors.light
  },
  '&:active': {
    backgroundColor: theme.colors.actionDark
  },
  '&:disabled': {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.grayLight,
    color: theme.colors.gray
  }
}))

export interface OutlineTextButtonProps extends ButtonProps {
  readonly label: string
}

export function OutlineTextButton({label, href, onClick, ...rest}: OutlineTextButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(OutlineTextButtonStyle)} {...rest}>
      {label}
    </Button>
  )
}
