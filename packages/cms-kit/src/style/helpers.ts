import {CSSStyle} from '@karma.run/react'

export enum Breakpoint {
  Mobile = 0,
  Desktop = 750
}

export enum ZIndex {
  Default = 0,
  NavigationBar = 10
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

export function onlyMobile(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (max-width: ${Breakpoint.Desktop - 1}px)`]: styles
  }
}

export function whenDesktop(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (min-width: ${Breakpoint.Desktop}px)`]: styles
  }
}
