import React, {ReactNode, useState, createContext, useEffect} from 'react'
import {Icon} from '../data/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {TransitionDuration, Spacing, FontSize, scrollBarStyle} from '../style/helpers'
import {MaterialIconChevronLeft, MaterialIconChevronRight} from '@karma.run/icons'

export const navigationWidth = 280
export const navigationWidthCollapsed = 60

export interface NavigationStyleProps {
  readonly isCollapsed: boolean
}

const NavigationStyle = cssRuleWithTheme<NavigationStyleProps>(({isCollapsed, theme}) => ({
  display: 'flex',
  flexDirection: 'column',

  width: isCollapsed ? navigationWidthCollapsed : navigationWidth,
  height: '100%',

  overflow: 'hidden',
  borderRight: `1px solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light,

  transitionProperty: 'width',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

const NavigationItemContentStyle = cssRuleWithTheme<NavigationStyleProps>(({theme}) => ({
  marginTop: 85,
  marginBottom: Spacing.Large,
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

  cursor: 'pointer',
  padding: 18,
  fontSize: FontSize.Heading2,
  fill: theme.colors.gray,
  border: 'none',
  backgroundColor: 'transparent',

  ':focus': {
    outline: 'none',
    fill: theme.colors.action
  }
}))

interface NavigationButtonProps {
  readonly isCollapsed: boolean
  onClick(): void
}

function NavigationButton({isCollapsed, onClick}: NavigationButtonProps) {
  const css = useThemeStyle({isCollapsed})

  return (
    <button onClick={onClick} className={css(NavigationButtonStyle)}>
      <Icon element={isCollapsed ? MaterialIconChevronRight : MaterialIconChevronLeft} block />
    </button>
  )
}

export interface NavigationContextState {
  isCollapsed: boolean
}

export const NavigationContext = createContext<NavigationContextState>({isCollapsed: false})
