import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing, FontSize} from '../style/helpers'

export const toastPositionShowen = 'translateY(0px)'
export const toastPositionHide = 'translateY(-100px)'

export const ToastStyle = cssRuleWithTheme<{type: ToastType}>(({type, theme}) => {
  function backgroundColor(): string {
    switch (type) {
      case ToastType.Info:
        return theme.colors.actionTransparent
      case ToastType.Success:
        return theme.colors.successTransparent
      case ToastType.Error:
        return theme.colors.alertTransparent
    }
  }

  function borderColor(): string {
    switch (type) {
      case ToastType.Info:
        return theme.colors.actionDarkTransparent
      case ToastType.Success:
        return theme.colors.successDarkTransparent
      case ToastType.Error:
        return theme.colors.alertDarkTransparent
    }
  }

  return {
    position: 'fixed',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: backgroundColor(),
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: pxToRem(FontSize.Medium),
    fontWeight: 'bold',
    backdropFilter: 'blur(5px)',
    padding: pxToRem(Spacing.Tiny),
    borderBottom: '1px solid',
    borderColor: borderColor(),
    cursor: 'pointer',
    boxShadow: '0 0 4px 0 rgba(34, 34, 34, 0.7)',

    transform: 'translateY(0px)', //isShowen ? toastPositionHide : toastPositionShowen
    transition: 'transform ease 0.5s'
  }
})

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
