import React, {createContext, ReactNode, useContext} from 'react'
import {useStyle, UseStyleResult, CSSRuleFn} from '@karma.run/react'

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

export function useThemeStyle<P = undefined>(): UseStyleResult<P & {theme: Theme}>
export function useThemeStyle<P>(props: P): UseStyleResult<P & {theme: Theme}>
export function useThemeStyle<P>(props?: P): UseStyleResult<P & {theme: Theme}> {
  const theme = useContext(ThemeContext)
  return useStyle({...props, theme} as P & {theme: Theme})
}

export function cssRuleWithTheme<P = {}>(
  styleFn: CSSRuleFn<P & {theme: Theme}>
): CSSRuleFn<P & {theme: Theme}> {
  return styleFn
}
