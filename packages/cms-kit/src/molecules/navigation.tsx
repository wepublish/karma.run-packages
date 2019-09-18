import React, {ReactNode} from 'react'
import {IconSize, Icon, IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, pxToEm} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'

export const NavigationStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({
  borderRight: `${pxToRem(1)} solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light,
  width: isOpen ? pxToRem(280) : pxToRem(60),
  height: '100vh',
  float: 'left',
  transition: '200ms',
  overflow: 'hidden'
}))

const NavigationItems = cssRuleWithTheme(({theme}) => ({
  marginTop: pxToRem(85),
  clear: 'both'
}))

export interface NavigationProps {
  isOpen: boolean
  onChange(): void
  children: ReactNode
}

export function Navigation({isOpen, onChange, children}: NavigationProps) {
  const {css} = useThemeStyle({isOpen: isOpen})

  return (
    <div className={css(NavigationStyle)}>
      <NavigationButton isOpen={isOpen} onChange={onChange} />
      <div className={css(NavigationItems)}>{children}</div>
    </div>
  )
}

const NavigationButtonStyle = cssRuleWithTheme(({theme}) => ({
  border: 'none',
  float: 'right',
  padding: pxToRem(4),
  margin: pxToRem(10)
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  fontSize: pxToEm(iconSize),
  fill: theme.colors.gray
}))

export interface NavigationButtonProps {
  isOpen: boolean
  onChange(): void
}

export function NavigationButton({isOpen, onChange}: NavigationButtonProps) {
  return (
    <BaseButton onClick={onChange} style={NavigationButtonStyle}>
      <Icon
        type={isOpen ? IconType.ChevronLeft : IconType.ChevronRight}
        style={IconStyle}
        styleProps={{iconSize: IconSize.Small}}
      />
    </BaseButton>
  )
}
