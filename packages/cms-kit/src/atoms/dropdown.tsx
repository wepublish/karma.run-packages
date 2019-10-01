import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle, ThemeContext} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export const DropdownStyle = cssRuleWithTheme(({theme}) => ({
  // todo
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.dark
}))

const DescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray
}))

export interface DropdownProps {
  readonly label?: string
  readonly value: string
  readonly options: Array<{value: string; name: string}>
  readonly description?: string
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLSelectElement>): void
}

export function Dropdown({
  label,
  value,
  options,
  description,
  onValueChange,
  className
}: DropdownProps) {
  const {css} = useThemeStyle()

  return (
    <div className={joinClassNames(css(DropdownStyle), className)}>
      <div className={css(LabelStyle)}>{label}</div>
      <select
        value={value}
        onChange={event => {
          onValueChange(event.target.value, event)
        }}>
        {options.map(option => (
          <option value={option.value}>{option.name}</option>
        ))}
      </select>
      <div className={css(DescriptionStyle)}>{description}</div>
    </div>
  )
}
