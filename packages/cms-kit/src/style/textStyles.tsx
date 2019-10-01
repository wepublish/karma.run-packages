import React, {ReactNode} from 'react'

import {cssRule} from '@karma.run/react'
import {pxToRem, FontSize} from './helpers'
import {cssRuleWithTheme, useThemeStyle} from './themeContext'

export enum FontFace {
  Regular = 'regular',
  Bold = 'bold',
  Italic = 'italic'
}

export enum Align {
  Regular = 'regular',
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export interface TextStyleProps {
  fontFace: FontFace
  align: Align
}

export function getFontWeight(fontFace: FontFace) {
  if (fontFace === FontFace.Bold) return 'bold'
  else return 'normal'
}

export function getFontStyle(fontFace: FontFace) {
  if (fontFace === FontFace.Italic) return 'italic'
  else return 'normal'
}

export const FontStyle = cssRuleWithTheme<TextStyleProps>(({fontFace, align, theme}) => ({
  textAlign: align === Align.Regular ? undefined : align,
  fontWeight: getFontWeight(fontFace),
  fontStyle: getFontStyle(fontFace)
}))

export interface TextProps {
  readonly children?: ReactNode
  readonly fontFace?: FontFace
  readonly align?: Align
}

// SMALL = 12px
export const TextSmallStyle = cssRule({
  fontSize: pxToRem(FontSize.Small)
})

export interface TextSmallProps extends TextProps {}

export function FontSmall({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextSmallProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <small className={css(FontStyle, TextSmallStyle)}>{children}</small>
}

// MEDIUM = 16px
export const TextMediumStyle = cssRule({
  fontSize: pxToRem(FontSize.Medium)
})

export interface TextMediumProps extends TextProps {}

export function FontMedium({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextMediumProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(FontStyle, TextMediumStyle)}>{children}</span>
}

// HEADING3 = 20px
export const Heading3Style = cssRule({
  fontSize: pxToRem(FontSize.Heading3),
  margin: 0
})

export interface Heading3Props extends TextProps {}

export function Heading3({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading3Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <h3 className={css(FontStyle, Heading3Style)}>{children}</h3>
}

// HEADING2 = 24px
export const Heading2Style = cssRule({
  fontSize: pxToRem(FontSize.Heading2),
  margin: 0
})

export interface Heading2Props extends TextProps {}

export function Heading2({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading2Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <h2 className={css(FontStyle, Heading2Style)}>{children}</h2>
}

// HEADING1 = 28px
export const Heading1Style = cssRule({
  fontSize: pxToRem(FontSize.Heading1),
  margin: 0
})

export interface Heading1Props extends TextProps {}

export function Heading1({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading1Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <h1 className={css(FontStyle, Heading1Style)}>{children}</h1>
}

// EXTRALARGE = 60px
export const TextExtraLargeStyle = cssRule({
  fontSize: pxToRem(FontSize.ExtraLarge),
  margin: 0
})

export interface TextExtraLargeProps extends TextProps {}

export function FontExtraLarge({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: TextExtraLargeProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <big className={css(FontStyle, TextExtraLargeStyle)}>{children}</big>
}
