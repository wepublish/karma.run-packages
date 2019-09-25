import React from 'react'
import {ToggleProps, Toggle} from '../atoms/toggle'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, Spacing} from '../style/helpers'

const ToggleStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  minHeight: pxToRem(30)
}))

const ToggleLabelStyle = cssRuleWithTheme(({theme}) => ({
  fontSize: pxToRem(FontSize.Medium),
  color: theme.colors.dark
}))
const ToggleLabelValueStyle = cssRuleWithTheme(({theme}) => ({}))
const ToggleDescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray,
  display: 'block',
  fontSize: pxToRem(FontSize.Small)
}))

export interface ToggleWithLabelProps extends ToggleProps {
  readonly label: string
  readonly description: string
}

export function ToggleWithLabel({
  label,
  description,
  id,
  checked,
  onSelectChange
}: ToggleWithLabelProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(ToggleStyle)}>
      <label className={css(ToggleLabelStyle)} htmlFor={id}>
        <span className={css(ToggleLabelValueStyle)}>{label}</span>
        <span className={css(ToggleDescriptionStyle)}>{description}</span>
      </label>
      <Toggle id={id} checked={checked} onSelectChange={onSelectChange} />
    </div>
  )
}
