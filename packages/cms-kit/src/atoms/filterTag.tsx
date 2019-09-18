import React from 'react'
import {IconType, Icon, IconSize} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {BaseButton} from './baseButton'

export const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.action
}))

const CloseButtonStyle = cssRuleWithTheme(() => ({
  height: pxToRem(IconSize.Small)
}))

const CloseIconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Small),
  fill: theme.colors.white
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
        <Icon type={IconType.Close} style={CloseIconStyle} />
      </BaseButton>
    </div>
  )
}
