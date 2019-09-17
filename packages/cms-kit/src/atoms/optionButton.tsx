import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {IconType, Icon} from './icon'

export const OptionButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: '2em',
  height: '2em',

  padding: '0.5em',

  backgroundColor: theme.colors.gray,
  border: 'none',
  borderRadius: '100%',

  '& path': {
    fill: theme.colors.action
  },

  '&:hover:enabled': {
    backgroundColor: theme.colors.light
  },

  '&:active': {
    backgroundImage: `linear-gradient(230deg, ${theme.colors.actionDark}, ${theme.colors.action})`
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
