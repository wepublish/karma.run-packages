import React from 'react'
import {cssRuleWithTheme, useThemeStyle, ThemeColors, Theme} from '../style/themeContext'
import {pxToRem, Spacing, FontSize, hexToRgba, BorderWidth} from '../style/helpers'

function borderColorForType(type: ToastType, theme: Theme): string {
  switch (type) {
    case ToastType.Info:
      return theme.colors.actionDark
    case ToastType.Success:
      return theme.colors.successDark
    case ToastType.Error:
      return theme.colors.alertDark
  }
}

function backgroundColorForType(type: ToastType, theme: Theme): string {
  switch (type) {
    case ToastType.Info:
      return theme.colors.action
    case ToastType.Success:
      return theme.colors.success
    case ToastType.Error:
      return theme.colors.alert
  }
}

const ToastStyle = cssRuleWithTheme<{type: ToastType}>(({type, theme}) => ({
  width: '100%',
  backgroundColor: hexToRgba(backgroundColorForType(type, theme), 0.85),
  color: theme.colors.white,

  textAlign: 'center',
  fontSize: pxToRem(FontSize.Medium),
  fontWeight: 'bold',

  backdropFilter: 'blur(5px)',
  padding: pxToRem(Spacing.Tiny),

  borderWidth: BorderWidth.Small,
  borderStyle: 'solid',
  borderColor: hexToRgba(borderColorForType(type, theme), 0.85),

  cursor: 'pointer',
  boxShadow: '0 0 4px 0 rgba(34, 34, 34, 0.5)'
}))

export enum ToastType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}

export interface ToastProps {
  type: ToastType
  text: string
}

export function Toast({type, text}: ToastProps) {
  const {css} = useThemeStyle({type: type})
  return <div className={css(ToastStyle)}>{text}</div>
}
