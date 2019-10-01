import {CSSStyle} from '@karma.run/react'

export enum Breakpoint {
  Mobile = 0,
  Tablet = 600,
  Desktop = 992
}

export enum ZIndex {
  Default = 0,
  NavigationBar = 10,
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

export enum BorderRadius {
  Small = 5,
  Medium = 10
}

export enum TransitionDuration {
  Fast = '200ms',
  Slow = '500ms'
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
