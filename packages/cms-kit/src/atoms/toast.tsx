import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'

export const ToastStyle = cssRuleWithTheme<{type: ToastType}>(({type, theme}) => {
  function backgroundColor(): string {
    switch (type) {
      case ToastType.Info:
        return theme.colors.light
      case ToastType.Action:
        return theme.colors.action
      case ToastType.Success:
        return `${theme.colors.success}80`
      case ToastType.Error:
        return `${theme.colors.alert}80`
    }
  }

  return {
    width: '100%',
    backgroundColor: backgroundColor(),
    color: type == ToastType.Info ? theme.colors.dark : theme.colors.white,
    textAlign: 'center',
    padding: pxToRem(Spacing.Tiny)
  }
})

export enum ToastType {
  Info = 'info',
  Action = 'action',
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
