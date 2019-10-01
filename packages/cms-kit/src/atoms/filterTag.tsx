import React from 'react'

import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BaseButton} from './baseButton'
import {FontSize, pxToRem, Spacing, TransitionDuration} from '../style/helpers'

const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.action,
  fontSize: pxToRem(FontSize.Small),
  minWidth: pxToRem(100),
  height: pxToRem(30),
  overflow: 'hidden',
  borderRadius: '2px',
  border: `1px solid ${theme.colors.actionDark}`,
  color: theme.colors.white,
  lineHeight: pxToRem(30),
  paddingLeft: pxToRem(Spacing.Tiny)
}))

const CloseButtonStyle = cssRuleWithTheme(({theme}) => ({
  fill: theme.colors.white,
  fontSize: pxToRem(FontSize.Medium),

  transitionProperty: 'fill',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  width: pxToRem(20),

  ':hover': {
    fill: theme.colors.actionDark
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
