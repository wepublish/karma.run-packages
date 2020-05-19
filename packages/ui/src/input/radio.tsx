import React, {ChangeEvent, useContext} from 'react'

import {FontSize, Spacing, BorderWidth} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {RadioGroupContext} from './radioGroup'

const RadioContainerStyle = cssRuleWithTheme(() => ({
  _className: process.env.NODE_ENV !== 'production' ? 'RadioContainer' : undefined,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  cursor: 'pointer',

  width: '100%'
}))

const RadioStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Radio' : undefined,

  position: 'absolute',

  width: 0,
  height: 0,
  opacity: 0,

  appearance: 'none',

  ':disabled + span': {
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white
  },

  ':checked + span': {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.actionDark
  },

  ':checked + span::after': {
    display: 'block',

    top: 2,
    left: 2,
    width: 14,
    height: 14,

    borderRadius: '50%',
    background: theme.colors.action
  },

  ':disabled:checked + span:after': {
    backgroundColor: theme.colors.grayLight
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'CheckMark' : undefined,

  position: 'relative',

  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: theme.colors.light,

  borderWidth: BorderWidth.Small,
  borderStyle: 'solid',
  borderColor: theme.colors.grayDark,

  '::after': {
    content: '""',
    position: 'absolute',
    display: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.grayDark,
  fontSize: FontSize.Medium,
  marginLeft: Spacing.ExtraSmall
}))

export interface RadioProps {
  label: string

  name?: string
  checked?: boolean
  value?: string
  disabled?: boolean

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Radio({label, name, value, checked, onChange, ...props}: RadioProps) {
  const css = useThemeStyle()
  const radioGroup = useContext(RadioGroupContext)
  const {name: radioGroupName, value: radioGroupValue, onChange: radioGroupOnChange} =
    radioGroup || {}

  return (
    <label className={css(RadioContainerStyle)}>
      <input
        {...props}
        name={radioGroupName != null ? radioGroupName : name}
        value={value}
        className={css(RadioStyle)}
        type="radio"
        checked={radioGroupValue != null ? radioGroupValue === value : checked}
        onChange={event => {
          onChange && onChange(event)
          radioGroupOnChange && radioGroupOnChange(event)
        }}
      />
      <span className={css(CheckMarkStyle)} />
      <span className={css(LabelStyle)}>{label}</span>
    </label>
  )
}
