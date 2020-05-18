import React, {forwardRef, ImgHTMLAttributes, ReactNode} from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware, Theme} from '../style/themeContext'

import {
  WidthProps,
  HeightProps,
  PositionProps,
  extractStyleProps,
  PaddingProps,
  hexToRgba,
  BlurStrength
} from '../style/helpers'

interface OverlayWrapperProps extends WidthProps, HeightProps, PaddingProps, PositionProps {
  theme: Theme
}

const OverlayElement = styled(
  'div',
  ({theme, position, ...props}: OverlayWrapperProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Overlay' : undefined,

    display: 'block',
    position: position ?? 'absolute',
    backgroundColor: hexToRgba(theme.colors.black, 0.8),
    color: theme.colors.white,

    backdropFilter: `blur(${BlurStrength.Strong})`,

    ...props
  }),
  themeMiddleware
)

export interface OverlayProps
  extends WidthProps,
    HeightProps,
    PaddingProps,
    PositionProps,
    Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  children?: ReactNode
}

export const Overlay = forwardRef<HTMLImageElement, OverlayProps>(function Image(
  {children, ...props},
  ref
) {
  const [styleProps, elementProps] = extractStyleProps(props)

  return (
    <OverlayElement {...elementProps} ref={ref} styleProps={styleProps}>
      {children}
    </OverlayElement>
  )
})
