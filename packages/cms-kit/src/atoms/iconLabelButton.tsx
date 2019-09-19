import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {IconType, Icon, IconScale} from './icon'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, FontSize, Spacing} from '../style/helpers'

const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(70),
  borderRadius: pxToRem(2),

  padding: pxToRem(Spacing.ExtraSmall),
  fontSize: pxToRem(FontSize.Small),

  whiteSpace: 'nowrap',

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
