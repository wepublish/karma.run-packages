import React, {ReactNode, useState, createContext, useEffect} from 'react'
import {Icon} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, TransitionDuration, Spacing, FontSize, scrollBarStyle} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'
import {MaterialIconChevronLeft, MaterialIconChevronRight} from '@karma.run/icons'

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

  transitionProperty: 'width',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

const NavigationItemContentStyle = cssRuleWithTheme<NavigationStyleProps>(({theme}) => ({
  marginTop: pxToRem(85),
  marginBottom: pxToRem(Spacing.Large),
  overflow: 'auto',

  ...scrollBarStyle(theme)
}))

export interface NavigationProps {
  readonly children?: ReactNode
}

export function Navigation({children}: NavigationProps) {
  const [isCollapsed, setCollapsed] = useState(
    typeof localStorage === 'object'
      ? JSON.parse(localStorage.getItem('karma.run/ui:isNavigationCollapsed') || 'false') // TODO: Use context to save user preferences
      : false
  )

  const css = useThemeStyle({isCollapsed})

  useEffect(() => {
    localStorage.setItem('karma.run/ui:isNavigationCollapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  return (
    <NavigationContext.Provider value={{isCollapsed}}>
      <div className={css(NavigationStyle)}>
        <NavigationButton isCollapsed={isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
        <div className={css(NavigationItemContentStyle)}>{children}</div>
      </div>
    </NavigationContext.Provider>
  )
}

const NavigationButtonStyle = cssRuleWithTheme(({theme}) => ({
  alignSelf: 'flex-end',

  padding: pxToRem(18),
  fontSize: pxToRem(FontSize.Heading2),
  fill: theme.colors.gray,

  ':focus': {
    fill: theme.colors.action
  }
}))

export interface NavigationButtonProps {
  readonly isCollapsed: boolean
  onClick(): void
}

export function NavigationButton({isCollapsed, onClick}: NavigationButtonProps) {
  return (
    <BaseButton onClick={onClick} style={NavigationButtonStyle}>
      <Icon element={isCollapsed ? MaterialIconChevronRight : MaterialIconChevronLeft} block />
    </BaseButton>
  )
}

export interface NavigationContextState {
  isCollapsed: boolean
}

export const NavigationContext = createContext<NavigationContextState>({isCollapsed: false})
