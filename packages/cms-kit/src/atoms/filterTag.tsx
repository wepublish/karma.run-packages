import React from 'react'

import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BaseButton} from './baseButton'
import {FontSize} from '../style/fontSize'

const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.action,
  fontSize: FontSize.Medium
}))

const CloseButtonStyle = cssRuleWithTheme(({theme}) => ({
  fill: theme.colors.white,

  ':hover': {
    fill: theme.colors.primary
  }
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
      <BaseButton onClick={onDismiss} style={CloseButtonStyle}>
        <Icon type={IconType.Close} />
      </BaseButton>
    </div>
  )
}
