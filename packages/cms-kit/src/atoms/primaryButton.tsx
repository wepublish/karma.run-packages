import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const PrimaryButtonStyle = cssRuleWithTheme(({theme}) => ({
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

export interface PrimaryButtonProps extends ButtonProps {
  readonly label: string
}

export function PrimaryButton({label, ...rest}: PrimaryButtonProps) {
  return (
    <BaseButton {...rest} style={PrimaryButtonStyle}>
      {label}
    </BaseButton>
  )
}
