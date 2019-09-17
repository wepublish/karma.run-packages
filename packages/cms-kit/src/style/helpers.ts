import {CSSStyle} from '@karma.run/react'

export enum Breakpoint {
  Mobile = 0,
  Desktop = 750
}

export enum ZIndex {
  Default = 0
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
