import React, {ElementType, SVGProps} from 'react'
import {toArray} from '@karma.run/utility'

import {cssRuleWithTheme, useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'

export type IconElement = ElementType<SVGProps<SVGSVGElement>>

export enum IconScale {
  Equal = '1em',
  Larger = '1.5em',
  Double = '2em'
}

interface IconStyleProps {
  readonly block?: boolean
  readonly scale: IconScale
}

const IconStyle = cssRuleWithTheme<IconStyleProps>(({scale, block}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Icon' : undefined,

  display: block ? 'block' : 'inline-block',

  flexShrink: 0,
  flexGrow: 0,

  height: '1em',
  fontSize: scale,
  lineHeight: 1,
  verticalAlign: 'middle',

  fill: 'inherit',
  stroke: 'inherit'
}))

export interface BaseIconProps {
  readonly element: IconElement
  readonly scale?: IconScale
  readonly block?: boolean
}

export interface IconProps<P = undefined> extends BaseIconProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
  readonly styleProps?: P
}

export interface IconPropsWithoutStyleProps extends BaseIconProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface IconPropsWithStyleProps<P = undefined> extends BaseIconProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export function Icon(props: IconPropsWithoutStyleProps): JSX.Element
export function Icon<P = undefined>(props: IconPropsWithStyleProps<P>): JSX.Element
export function Icon<P = undefined>({
  element: Element,
  scale = IconScale.Equal,
  block,
  style,
  styleProps
}: IconProps<P>): JSX.Element {
  const css = useThemeStyle({...styleProps, scale, block})
  return <Element className={css(IconStyle, ...toArray(style))} role="img" />
}
