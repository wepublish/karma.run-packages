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

export interface IconSizes {
  xsmall: number
  small: number
  medium: number // or default?
  default: number
}

export interface LayoutSpacing {
  tiny: number
  xsmall: number
  small: number
  medium: number
  large: number
  xlarge: number
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

export function useThemeStyle(): UseStyleResult<{theme: Theme}>
export function useThemeStyle<P>(props: P): UseStyleResult<P & {theme: Theme}>
export function useThemeStyle<P>(props?: P): UseStyleResult<P & {theme: Theme}> {
  const theme = useContext(ThemeContext)
  return useStyle({...props, theme} as P & {theme: Theme})
}

export type CSSRuleWithTheme<P = {}> = CSSRuleFn<P & {theme: Theme}>

export function cssRuleWithTheme<P = {}>(styleFn: CSSRuleWithTheme<P>): CSSRuleWithTheme<P> {
  return styleFn
}
