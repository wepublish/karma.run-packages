import React from 'react'
import {BaseButtonProps, BaseButton} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'

export const TextButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  border: 'none',
  color: theme.colors.action,

  '&:hover': {
    backgroundColor: theme.colors.light
  },

  '&:active': {
    backgroundColor: theme.colors.actionDark
  },

  '&:disabled': {
    backgroundColor: theme.colors.light,
    color: theme.colors.gray
  }
}))

export interface TextButtonProps extends BaseButtonProps {
  readonly label: string
}

export function TextButton({label, ...rest}: TextButtonProps) {
  return (
    <BaseButton {...rest} style={TextButtonStyle}>
      {label}
    </BaseButton>
  )
}
