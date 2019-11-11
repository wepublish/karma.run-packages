import React, {forwardRef, ImgHTMLAttributes} from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware, Theme} from '../style/themeContext'

interface ImageWrapperProps {
  readonly contain?: boolean
  readonly theme: Theme
}

const ImageWrapper = styled(
  'img',
  ({theme, contain}: ImageWrapperProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Image' : undefined,

    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.light,
    objectFit: contain ? 'contain' : 'cover'
  }),
  themeMiddleware
)

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  contain?: boolean
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {contain, ...props},
  ref
) {
  return <ImageWrapper ref={ref} styleProps={{contain}} {...props} />
})
