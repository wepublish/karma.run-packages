import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

export const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.action
}))

export interface FilterTagProps {
  readonly text: string
  onDismiss(): void
}

export function FilterTag({text, onDismiss}: FilterTagProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(FilterTagStyle)}>
      {text}
      <button onClick={onDismiss}>
        <Icon type={IconType.Replace} />
      </button>
    </div>
  )
}
