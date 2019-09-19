import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const OutlineButtonStyle = cssRuleWithTheme<{invert: boolean}>(({invert, theme}) => ({
  backgroundColor: invert ? 'transparent' : theme.colors.white,
  borderColor: theme.colors.action,
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.action,

  '&:hover': {
    backgroundColor: invert ? theme.colors.grayDark : theme.colors.light
  },

  '&:active': {
    backgroundColor: theme.colors.actionDark
  },

  '&:disabled': {
    backgroundColor: invert ? 'transparent' : theme.colors.light,
    borderColor: theme.colors.grayLight,
    color: theme.colors.gray
  }
}))

export interface OutlineButtonProps extends ButtonProps {
  readonly label: string
  readonly isInvert?: boolean
}

export function OutlineButton({label, isInvert, ...rest}: OutlineButtonProps) {
  const invert = isInvert != undefined && isInvert
  return (
    <BaseButton {...rest} style={OutlineButtonStyle} styleProps={{invert: invert}}>
      {label}
    </BaseButton>
  )
}
