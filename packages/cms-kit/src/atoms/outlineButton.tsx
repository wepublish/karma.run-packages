import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const OutlineButtonStyle = cssRuleWithTheme(({theme}) => ({
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

export interface OutlineButtonProps extends ButtonProps {
  readonly label: string
}

export function OutlineButton({label, ...rest}: OutlineButtonProps) {
  return (
    <BaseButton {...rest} style={OutlineButtonStyle}>
      {label}
    </BaseButton>
  )
}
