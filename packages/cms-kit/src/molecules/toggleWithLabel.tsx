import React from 'react'
import {ToggleProps, Toggle} from '../atoms/toggle'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {toArray} from '../utility'

const ToggleStyle = cssRuleWithTheme(({theme}) => ({}))

const ToggleLabelStyle = cssRuleWithTheme(({theme}) => ({}))
const ToggleLabelValueStyle = cssRuleWithTheme(({theme}) => ({}))
const ToggleDescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray
}))

export interface ToggleWithLabelProps extends ToggleProps {
  readonly label: string
  readonly description: string
}

export function ToggleWithLabel({
  label,
  description,
  id,
  style,
  checked,
  onSelectChange
}: ToggleWithLabelProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(ToggleStyle, ...toArray(style))}>
      <label className={css(ToggleLabelStyle)} htmlFor={id}>
        <span className={css(ToggleLabelValueStyle)}>{label}</span>
        <span className={css(ToggleDescriptionStyle)}>{description}</span>
      </label>
      <Toggle id={id} checked={checked} onSelectChange={onSelectChange} />
    </div>
  )
}
