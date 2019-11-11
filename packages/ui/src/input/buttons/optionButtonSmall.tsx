import React from 'react'

import {BaseButton, ButtonProps} from '../../atoms/baseButton'
import {IconType, Icon} from '../../atoms/icon'
import {cssRuleWithTheme} from '../../style/themeContext'
import {pxToEm, TransitionDuration, FontSize} from '../../style/helpers'

const OptionButtonSmallStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',

  flexShrink: 0,
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',

  width: pxToEm(20),
  height: pxToEm(20),
  fontSize: pxToEm(FontSize.Small),

  borderRadius: '100%',

  backgroundColor: theme.colors.white,
  border: `solid 1px ${theme.colors.grayLight}`,

  fill: theme.colors.dark,

  transitionProperty: 'background-color, border',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':hover:enabled': {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.action
  },

  ':active:enabled': {
    backgroundColor: theme.colors.actionDark,
    fill: theme.colors.action
  },

  ':disabled': {
    fill: theme.colors.gray
  }
}))

export interface OptionButtonSmallProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButtonSmall({icon, ...rest}: OptionButtonSmallProps) {
  return (
    <BaseButton {...rest} style={OptionButtonSmallStyle}>
      <Icon element={icon} />
    </BaseButton>
  )
}
