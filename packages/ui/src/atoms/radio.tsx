import React, {ChangeEvent, useContext} from 'react'

import {BaseInput, InputType} from './baseInput'

import {pxToRem, FontSize, Spacing, BorderWidth} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {RadioGroupContext} from './radioGroup'

const RadioContainerStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  cursor: 'pointer',

  width: '100%'
}))

const RadioStyle = cssRuleWithTheme(({theme}) => ({
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

    top: pxToRem(2),
    left: pxToRem(2),
    width: pxToRem(14),
    height: pxToRem(14),

    borderRadius: '50%',
    background: theme.colors.action
  },

  ':disabled:checked + span:after': {
    backgroundColor: theme.colors.grayLight
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',

  width: pxToRem(20),
  height: pxToRem(20),
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
  color: theme.colors.dark,
  fontSize: pxToRem(FontSize.Medium),
  marginLeft: pxToRem(Spacing.ExtraSmall)
}))

export interface RadioProps {
  readonly label: string

  readonly name?: string
  readonly checked?: boolean
  readonly value?: string
  readonly disabled?: boolean

  onChange?(event: ChangeEvent<HTMLInputElement>): void
}

export function Radio({label, name, value, checked, onChange, ...props}: RadioProps) {
  const css = useThemeStyle()
  const radioGroup = useContext(RadioGroupContext)
  const {name: radioGroupName, value: radioGroupValue, onChange: radioGroupOnChange} =
    radioGroup || {}

  return (
    <label className={css(RadioContainerStyle)}>
      <BaseInput
        {...props}
        name={radioGroupName != null ? radioGroupName : name}
        value={value}
        style={RadioStyle}
        type={InputType.Radio}
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
