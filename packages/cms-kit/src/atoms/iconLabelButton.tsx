import React from 'react'

import {pxToRem, Spacing, TransitionDuration, FontSize} from '../style/helpers'
import {cssRuleWithTheme} from '../style/themeContext'
import {BaseButton, ButtonProps} from './baseButton'
import {Icon, IconScale, IconType} from './icon'

const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  minWidth: pxToRem(70),
  borderRadius: pxToRem(2),

  fontSize: pxToRem(FontSize.Small),
  padding: pxToRem(Spacing.Tiny),

  transitionProperty: 'fill, background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    fill: theme.colors.action
  },

  '&:active:enabled': {
    fill: theme.colors.actionDark,
    backgroundColor: theme.colors.light
  },

  '&:disabled': {
    fill: theme.colors.gray,
    color: theme.colors.gray
  }
}))

export interface IconLabelButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly label: string
}

export function IconLabelButton({label, icon, ...rest}: IconLabelButtonProps) {
  return (
    <BaseButton {...rest} style={IconLabelButtonStyle}>
      <Icon type={icon} scale={IconScale.Double} />
      <div>{label}</div>
    </BaseButton>
  )
}
