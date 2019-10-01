import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration} from '../style/helpers'

const PrimaryButtonStyle = cssRuleWithTheme(({theme}) => ({
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  minWidth: pxToRem(140),

  color: theme.colors.white,
  backgroundColor: theme.colors.primary,

  fontSize: pxToRem(FontSize.Medium),
  fontWeight: 'bold',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.grayLight
  },

  ':disabled': {
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
