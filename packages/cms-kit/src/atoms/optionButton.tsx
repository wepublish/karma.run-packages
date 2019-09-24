import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {IconType, Icon} from './icon'
import {pxToRem, TransitionDuration} from '../style/helpers'

export const OptionButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(40),
  height: pxToRem(40),

  fontSize: pxToRem(24),
  lineHeight: pxToRem(24),

  backgroundColor: theme.colors.white,
  border: 'none',
  borderRadius: '100%',

  transition: 'background-color ease-in',
  transitionDuration: TransitionDuration.Fast,

  '& path': {
    fill: theme.colors.action
  },

  '&:hover:enabled': {
    backgroundColor: theme.colors.light
  },

  '&:active:enabled': {
    backgroundColor: theme.colors.actionDark
  },

  '&:disabled path': {
    fill: theme.colors.gray
  }
}))

const IconStyle = cssRuleWithTheme(({theme}) => ({}))

export interface OptionButtonProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButton({icon, ...rest}: OptionButtonProps) {
  return (
    <BaseButton {...rest} style={OptionButtonStyle}>
      <Icon type={icon} style={IconStyle} />
    </BaseButton>
  )
}
