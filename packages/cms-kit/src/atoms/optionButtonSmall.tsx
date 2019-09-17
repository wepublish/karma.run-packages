import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {IconType, Icon} from './icon'
import {pxToEm} from '../style/helpers'

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

  '> *': {
    fontSize: pxToEm(14)
  },

  '&:hover:enabled': {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.5)'
  },

  '&:active:enabled': {
    backgroundColor: theme.colors.light
  },

  '&:disabled': {
    fill: theme.colors.gray
  },

  '&:focus': {
    outline: 'none',
    fill: theme.colors.action,
    border: `solid 1px ${theme.colors.action}`
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
