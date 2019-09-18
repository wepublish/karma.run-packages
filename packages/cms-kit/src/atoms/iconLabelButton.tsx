import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {IconType, Icon, IconSize} from './icon'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/spacing'

export const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(70),
  borderRadius: pxToRem(2),

  '&:hover:enabled': {
    fill: theme.colors.action
  },

  '&:active': {
    fill: theme.colors.action,
    backgroundColor: theme.colors.light
  },

  '&:disabled': {
    fill: theme.colors.gray,
    color: theme.colors.gray
  },

  '&:focus': {
    outline: 'none',
    fill: theme.colors.action
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
