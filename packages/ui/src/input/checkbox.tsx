import React, {ChangeEvent} from 'react'

import {FontSize, Spacing} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

const CheckboxContainerStyle = cssRuleWithTheme(() => ({
  _className: process.env.NODE_ENV !== 'production' ? 'CheckboxContainer' : undefined,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',

  width: '100%'
}))

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Checkbox' : undefined,

  position: 'absolute',

  width: 0,
  height: 0,
  opacity: 0,

  appearance: 'none',

  ':checked + span': {
    backgroundColor: theme.colors.action,
    borderColor: theme.colors.actionDark
  },

  ':checked + span::after': {
    display: 'block',

    top: 1,
    left: 6,
    width: 6,
    height: 13,

    border: `solid ${theme.colors.white}`,
    borderWidth: `0 2px 2px 0`,
    transform: 'rotate(42deg)'
  },

  ':disabled + span': {
    borderColor: theme.colors.grayLight,
    backgroundColor: theme.colors.white
  },

  ':disabled:checked + span': {
    backgroundColor: theme.colors.grayLight
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'CheckMark' : undefined,

  position: 'relative',

  width: 20,
  height: 20,
  borderRadius: 2,
  backgroundColor: theme.colors.light,
  border: `1px solid ${theme.colors.grayDark}`,

  '::after': {
    content: '""',
    position: 'absolute',
    display: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'CheckMarkLabel' : undefined,

  color: theme.colors.grayDark,
  fontSize: FontSize.Medium,
  marginLeft: Spacing.ExtraSmall
}))

export interface CheckboxProps {
  label: string
  checked: boolean

  value?: string
  disabled?: boolean

  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox({label, ...props}: CheckboxProps) {
  const css = useThemeStyle()

  return (
    <label className={css(CheckboxContainerStyle)}>
      <input {...props} type="checkbox" className={css(CheckboxStyle)} />
      <span className={css(CheckMarkStyle)} />
      <span className={css(LabelStyle)}>{label}</span>
    </label>
  )
}
