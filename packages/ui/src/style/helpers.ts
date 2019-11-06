import {CSSStyle} from '@karma.run/react'
import {Theme} from './themeContext'

export enum Breakpoint {
  Mobile = 0,
  Tablet = 600,
  Desktop = 992
}

export enum ZIndex {
  Default = 0,
  NavigationBar = 10,
  Sidebar = 20,
  Modal = 1050,
  ModalBackdrop = 1040
}

export enum Spacing {
  None = 0,
  Tiny = 5,
  ExtraSmall = 10,
  Small = 20,
  Medium = 30,
  Large = 40,
  ExtraLarge = 60
}

export enum FontSize {
  Small = 12,
  Medium = 16,
  Heading3 = 20,
  Heading2 = 24,
  Heading1 = 28,
  ExtraLarge = 60
}

export enum BorderWidth {
  Small = '1px'
}

export enum BorderRadius {
  Tiny = '0.2rem',
  Small = '0.5rem',
  Medium = '1rem'
}

export enum TransitionDurationRaw {
  Fast = 100,
  Slow = 200
}

export enum TransitionDuration {
  Fast = '100ms',
  Slow = '200ms'
}

export function pxToRem(px: number) {
  return `${px / 10}rem`
}

export function pxToEm(px: number) {
  return `${px / 10}em`
}

export function whenTablet(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (max-width: ${Breakpoint.Desktop - 1}px)`]: styles
  }
}

export function whenMobile(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (max-width: ${Breakpoint.Tablet - 1}px)`]: styles
  }
}

export function hexToRgba(hex: string | number, alpha: number) {
  hex = typeof hex === 'string' ? parseInt(hex[0] === '#' ? hex.slice(1) : hex, 16) : hex

  const red = 0xff & (hex >> 16)
  const green = 0xff & (hex >> 8)
  const blue = 0xff & (hex >> 0)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function remify(value?: string | number) {
  return typeof value === 'string' ? value : value != undefined ? pxToRem(value) : value
}

export function scrollBarStyle(theme: Theme): CSSStyle {
  return {
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
  }
}
