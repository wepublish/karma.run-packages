import React, {ReactNode, ElementType, CSSProperties, forwardRef} from 'react'

import {pxToRem, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle, ThemeColors} from '../style/themeContext'

export type TypographyVariant =
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'

export type TypographyTextAlign = 'left' | 'center' | 'right'
export type TypographyDisplay = 'block' | 'inline'
export type TypographySpacing = 'small' | 'large'

interface TypographStyleProps {
  readonly variant: TypographyVariant
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing?: TypographySpacing
  readonly noWrap?: boolean
}

const TypographStyle = cssRuleWithTheme<TypographStyleProps>(
  ({variant, color, align, display, spacing, noWrap, theme}) => ({
    display,
    textAlign: align,
    color: color ? theme.colors[color] : undefined,
    whiteSpace: noWrap ? 'nowrap' : undefined,
    textOverflow: noWrap ? 'ellipsis' : undefined,
    overflow: noWrap ? 'hidden' : undefined,
    marginTop: 0,
    marginBottom: spacing ? marginForTypographySpacing(spacing) : 0,
    ...stylesForTypographyVariant(variant)
  })
)

export interface TypographyProps {
  readonly variant?: TypographyVariant
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing?: TypographySpacing
  readonly noWrap?: boolean
  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    variant = 'body1',
    color,
    align,
    display,
    spacing,
    noWrap,
    element = elementForTypographyVariant(variant),
    children,
    ...props
  },
  ref
) {
  const Element = element as any
  const css = useThemeStyle<TypographStyleProps>({
    variant,
    color,
    align,
    display,
    spacing,
    noWrap
  })

  return (
    <Element ref={ref} className={css(TypographStyle)} {...props}>
      {children}
    </Element>
  )
})

export function elementForTypographyVariant(variant: TypographyVariant) {
  switch (variant) {
    case 'title':
      return 'h1'

    case 'h1':
      return 'h1'

    case 'h2':
      return 'h2'

    case 'h3':
      return 'h3'

    default:
      return 'p'
  }
}

export function marginForTypographySpacing(spacing: TypographySpacing): string {
  switch (spacing) {
    case 'small':
      return '0.4em'

    case 'large':
      return '0.8em'
  }
}

export function stylesForTypographyVariant(style: TypographyVariant): CSSProperties {
  switch (style) {
    case 'title':
      return {
        fontSize: pxToRem(FontSize.ExtraLarge)
      }

    case 'h1':
      return {
        fontSize: pxToRem(FontSize.Heading1)
      }

    case 'h2':
      return {
        fontSize: pxToRem(FontSize.Heading2)
      }

    case 'h3':
      return {
        fontSize: pxToRem(FontSize.Heading3)
      }

    case 'body1':
    case 'body2':
      return {
        fontSize: pxToRem(FontSize.Medium),
        fontWeight: style === 'body2' ? 'bold' : undefined
      }

    case 'subtitle1':
    case 'subtitle2':
      return {
        fontSize: pxToRem(FontSize.Small),
        fontStyle: style === 'subtitle2' ? 'italic' : undefined
      }
  }
}
