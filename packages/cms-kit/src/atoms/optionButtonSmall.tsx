import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {IconType, Icon} from './icon'
import {pxToEm, TransitionDuration} from '../style/helpers'

export const OptionButtonSmallStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  width: pxToEm(20),
  height: pxToEm(20),

  flexShrink: 0,
  flexGrow: 0,

  borderRadius: '100%',

  backgroundColor: theme.colors.white,
  border: `solid 1px ${theme.colors.grayLight}`,

  fill: theme.colors.dark,

  transition: 'background-color ease-in, border ease-in',
  transitionDuration: TransitionDuration.Fast,

  '> *': {
    fontSize: pxToEm(14)
  },

  '&:hover:enabled': {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.action
  },

  '&:active:enabled': {
    backgroundColor: theme.colors.actionDark,
    fill: theme.colors.action
  },

  '&:disabled': {
    fill: theme.colors.gray
  }
}))

const IconStyle = cssRuleWithTheme(({theme}) => ({}))

export interface OptionButtonSmallProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButtonSmall({icon, ...rest}: OptionButtonSmallProps) {
  return (
    <BaseButton {...rest} style={OptionButtonSmallStyle}>
      <Icon type={icon} style={IconStyle} />
    </BaseButton>
  )
}
