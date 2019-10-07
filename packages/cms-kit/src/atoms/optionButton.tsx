import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {IconType, Icon} from './icon'
import {pxToRem, TransitionDuration, FontSize} from '../style/helpers'
import {cssRuleWithTheme} from '../style/themeContext'

const OptionButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(40),
  height: pxToRem(40),

  fontSize: pxToRem(FontSize.Heading2),
  lineHeight: 1,

  border: 'none',
  borderRadius: '100%',

  transitionProperty: 'background',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  fill: theme.colors.action,
  backgroundColor: theme.colors.white,

  ':hover:enabled': {
    backgroundColor: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.actionDark
  },

  ':disabled': {
    fill: theme.colors.gray
  }
}))

export interface OptionButtonProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButton({icon, ...rest}: OptionButtonProps) {
  return (
    <BaseButton {...rest} style={OptionButtonStyle}>
      <Icon element={icon} />
    </BaseButton>
  )
}
