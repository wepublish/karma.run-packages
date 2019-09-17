import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {IconType, Icon, IconSize} from './icon'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  border: 'none',

  '&:hover:enabled path': {
    fill: theme.colors.action
  },
  '&:active': {
    backgroundColor: theme.colors.light
  },
  '&:active path': {
    fill: theme.colors.action
  },
  '&:disabled': {
    color: theme.colors.gray
  },
  '&:disabled path': {
    fill: theme.colors.gray
  }
}))

export const IconLabelIconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Default)
}))

export interface IconLabelButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly label: string
}

export function IconLabelButton({label, icon, ...rest}: IconLabelButtonProps) {
  return (
    <BaseButton {...rest} style={IconLabelButtonStyle}>
      <>
        <Icon type={icon} style={IconLabelIconStyle} />
        <div>{label}</div>
      </>
    </BaseButton>
  )
}
