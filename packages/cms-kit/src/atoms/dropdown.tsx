import React from 'react'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing, BorderWidth} from '../style/helpers'
import {joinClassNames} from '@karma.run/react'

const DropdownContainerStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',
  minHeight: pxToRem(54),

  ':after': {
    position: 'absolute',
    top: '22px',
    right: pxToRem(2),
    content: '""',
    borderLeft: '0.6rem solid transparent',
    borderRight: '0.6rem solid transparent',
    borderTop: `0.8rem solid ${theme.colors.gray}`,
    pointerEvents: 'none'
  },

  '> select': {
    backgroundColor: theme.colors.white,
    width: '100%',
    height: pxToRem(22),
    fontSize: pxToRem(FontSize.Medium),
    border: 'none',
    borderBottom: `${BorderWidth.Small} solid`,
    borderColor: theme.colors.gray,
    borderRadius: 0,
    textTransform: 'none',
    appearance: 'none',

    ':focus': {
      outline: 'none'
    }
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

const DescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
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
    <div className={joinClassNames(css(DropdownContainerStyle), className)}>
      <label className={css(LabelStyle)}>{label}</label>
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
