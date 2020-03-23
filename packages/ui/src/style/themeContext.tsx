import React, {createContext, ReactNode, useContext} from 'react'
import {useStyle, CSSRule} from '@karma.run/react'

import {defaultTheme} from './defaultTheme'

export interface ThemeColors {
  primary: string
  primaryDark: string

  action: string
  actionDark: string

  success: string
  successDark: string

  alert: string
  alertDark: string

  gray: string
  grayDark: string
  grayLight: string

  light: string
  dark: string

  white: string
  black: string
}

export interface Theme {
  colors: ThemeColors
}

export const ThemeContext = createContext<Theme>(defaultTheme)

export interface ThemeProviderProps {
  theme?: Theme
  children?: ReactNode
}

export function ThemeProvider({theme, children}: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme || defaultTheme}>{children}</ThemeContext.Provider>
}

export function useThemeStyle(): (...rules: CSSRule<{theme: Theme}>[]) => string
export function useThemeStyle<P>(props: P): (...rules: CSSRule<P & {theme: Theme}>[]) => string
export function useThemeStyle<P>(props?: P): (...rules: CSSRule<P & {theme: Theme}>[]) => string {
  const theme = useContext(ThemeContext)
  return useStyle({...props, theme} as P & {theme: Theme})
}

export type CSSRuleWithTheme<P = {}> = CSSRule<P & {theme: Theme}>

export function cssRuleWithTheme<P = {}>(styleFn: CSSRuleWithTheme<P>): CSSRuleWithTheme<P> {
  return styleFn
}

export function themeMiddleware() {
  return {theme: useContext(ThemeContext)}
}
