import React, {forwardRef, ImgHTMLAttributes, useState, AriaAttributes, DOMAttributes} from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware, Theme, useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

import {
  TransitionDuration,
  MarginProps,
  WidthProps,
  HeightProps,
  extractStyleProps,
  FlexChildProps
} from '../style/helpers'

interface ImageWrapperProps extends WidthProps, HeightProps, MarginProps, FlexChildProps {
  isLoaded?: boolean
  contain?: boolean
  theme: Theme
}

const ImageWrapper = styled(
  'img',
  ({theme, isLoaded, contain, ...props}: ImageWrapperProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Image' : undefined,

    display: 'block',
    objectFit: contain ? 'contain' : 'cover',

    opacity: isLoaded ? 1 : 0,
    backgroundColor: theme.colors.light,

    transitionProperty: 'opacity',
    transitionDuration: TransitionDuration.ExtraSlow,

    ...props
  }),
  themeMiddleware
)

export interface ImageProps
  extends WidthProps,
    HeightProps,
    MarginProps,
    FlexChildProps,
    Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  contain?: boolean
  imageWidth?: number
  imageHeight?: number
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {contain, onLoad, imageWidth, imageHeight, ...props},
  ref
) {
  const [isLoaded, setLoaded] = useState(false)
  const [styleProps, elementProps] = extractStyleProps(props)

  return (
    <ImageWrapper
      {...elementProps}
      ref={ref}
      width={imageWidth}
      height={imageHeight}
      styleProps={{isLoaded, contain, ...styleProps}}
      onLoad={e => {
        setLoaded(true)
        onLoad?.(e)
      }}
    />
  )
})

interface ImagePlaceholderStyleProps extends WidthProps, HeightProps, MarginProps, FlexChildProps {
  theme: Theme
}

const ImagePlaceholderStyle = cssRuleWithTheme<ImagePlaceholderStyleProps>(({theme, ...props}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ImagePlaceholder' : undefined,

  overflow: 'hidden',
  fill: 'inherit',
  stroke: theme.colors.grayLight,

  ...props
}))

export interface ImagePlaceholderProps
  extends WidthProps,
    HeightProps,
    MarginProps,
    FlexChildProps,
    AriaAttributes,
    DOMAttributes<SVGSVGElement> {}

export const ImagePlaceholder = forwardRef<SVGSVGElement, ImagePlaceholderProps>(
  function ImagePlaceholder(props, ref) {
    const [layoutProps, elementProps] = extractStyleProps(props)
    const css = useThemeStyle(layoutProps)

    return (
      <svg {...elementProps} ref={ref} className={css(ImagePlaceholderStyle)} viewBox="0 0 64 64">
        <line x1="0" y1="0" x2="64" y2="64" fill="none" strokeWidth="1" />
        <line x1="64" y1="0" x2="0" y2="64" fill="none" strokeWidth="1" />
      </svg>
    )
  }
)
