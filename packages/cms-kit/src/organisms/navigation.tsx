import React, {ReactNode, useState} from 'react'
import {Icon, IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'
import {TransitionDuration} from '../style/transition'
import {Spacing} from '../style/spacing'
import {FontSize} from '../style/fontSize'

export const navigationWidth = 280
export const navigationWidthCollapsed = 60

export interface NavigationStyleProps {
  readonly isCollapsed: boolean
}

const NavigationStyle = cssRuleWithTheme<NavigationStyleProps>(({isCollapsed, theme}) => ({
  display: 'flex',
  flexDirection: 'column',

  width: isCollapsed ? pxToRem(navigationWidthCollapsed) : pxToRem(navigationWidth),
  height: '100%',

  overflow: 'hidden',
  borderRight: `1px solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light,
  transition: `width ${TransitionDuration.Fast}`
}))

const NavigationItemContentStyle = cssRuleWithTheme<NavigationStyleProps>(({theme}) => ({
  marginTop: pxToRem(85),
  marginBottom: pxToRem(Spacing.Large),
  overflow: 'auto',

  '::-webkit-scrollbar': {
    width: pxToRem(Spacing.Tiny)
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.gray,
    borderTopLeftRadius: pxToRem(Spacing.Tiny),
    borderBottomLeftRadius: pxToRem(Spacing.Tiny)
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: theme.colors.grayLight,
    borderTopLeftRadius: pxToRem(Spacing.Tiny),
    borderBottomLeftRadius: pxToRem(Spacing.Tiny)
  }
}))

export interface NavigationProps {
  readonly children?: (isCollapsed: boolean) => ReactNode
}

export function Navigation({children}: NavigationProps) {
  const [isCollapsed, setCollapsed] = useState(false)
  const {css} = useThemeStyle({isCollapsed})

  return (
    <div className={css(NavigationStyle)}>
      <NavigationButton isCollapsed={isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
      <div className={css(NavigationItemContentStyle)}>{children && children(isCollapsed)}</div>
    </div>
  )
}

export const NavigationButtonStyle = cssRuleWithTheme(({theme}) => ({
  border: 'none',
  alignSelf: 'flex-end',
  padding: pxToRem(Spacing.Small),
  fontSize: pxToRem(FontSize.Medium),
  fill: theme.colors.gray
}))

export interface NavigationButtonProps {
  readonly isCollapsed: boolean
  onClick(): void
}

export function NavigationButton({isCollapsed, onClick}: NavigationButtonProps) {
  return (
    <BaseButton onClick={onClick} style={NavigationButtonStyle}>
      <Icon type={isCollapsed ? IconType.ChevronRight : IconType.ChevronLeft} />
    </BaseButton>
  )
}
