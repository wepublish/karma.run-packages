import React from 'react'
import {BaseButtonProps, BaseButton} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, TransitionDuration, Spacing, FontSize} from '../style/helpers'

const TextButtonStyle = cssRuleWithTheme(({theme}) => ({
  border: 'none',
  color: theme.colors.action,
  borderRadius: '2px',

  fontSize: FontSize.Medium,

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  minWidth: pxToRem(140),
  padding: `${pxToRem(Spacing.Tiny)} ${pxToRem(Spacing.ExtraSmall)}`,

  ':hover:enabled': {
    backgroundColor: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.actionDark
  },

  ':disabled': {
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
