import React, {forwardRef, ImgHTMLAttributes, useState} from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware, Theme} from '../style/themeContext'

import {
  TransitionDuration,
  MarginProps,
  WidthProps,
  HeightProps,
  extractStyleProps,
  FlexChildProps
} from '../style/helpers'

interface ImageWrapperProps extends WidthProps, HeightProps, MarginProps, FlexChildProps {
  readonly isLoaded?: boolean
  readonly contain?: boolean
  readonly theme: Theme
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
  readonly contain?: boolean
  readonly imageWidth?: number
  readonly imageHeight?: number
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
