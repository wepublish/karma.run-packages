import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {SelectChangeEvent, Select} from './select'

const RadioButtonStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface RadioButtonProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectChangeEvent): void
  readonly className?: string
}

export function RadioButton(props: RadioButtonProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <Select
        style={RadioButtonStyle}
        id={props.id}
        type="radio"
        checked={props.isChecked}
        onSelectChange={props.onChange}
      />
      <label className={css(LabelStyle)} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )
}
