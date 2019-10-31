import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, BorderWidth} from '../style/helpers'

const OutlineButtonStyle = cssRuleWithTheme<{invert: boolean}>(({invert, theme}) => ({
  borderWidth: BorderWidth.Small,
  borderColor: theme.colors.action,
  borderStyle: 'solid',

  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.action,
  fontSize: pxToRem(FontSize.Medium),
  minWidth: pxToRem(140),

  transitionProperty: 'background-color, box-shadow',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':hover': {
    backgroundColor: invert ? theme.colors.grayDark : theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.actionDark
  },

  ':disabled': {
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
