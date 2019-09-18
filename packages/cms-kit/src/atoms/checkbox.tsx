import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {SelectChangeEvent, Select} from './select'

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface CheckboxProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectChangeEvent): void
  readonly className?: string
}

export function Checkbox(props: CheckboxProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <Select
        id={props.id}
        style={CheckboxStyle}
        type="checkbox"
        checked={props.isChecked}
        onSelectChange={props.onChange}
      />
      <label className={css(LabelStyle)} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )
}
