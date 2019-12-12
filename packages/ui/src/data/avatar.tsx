import React, {ReactNode, forwardRef, HTMLAttributes} from 'react'
import {styled} from '@karma.run/react'

import {themeMiddleware, Theme} from '../style/themeContext'

import {
  BorderWidth,
  MarginProps,
  FlexChildProps,
  extractStyleProps,
  WidthProps,
  HeightProps
} from '../style/helpers'

interface AvatarElementProps extends MarginProps, WidthProps, HeightProps, FlexChildProps {
  theme: Theme
}

const AvatarElement = styled(
  'div',
  ({theme, ...props}: AvatarElementProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Avatar' : undefined,

    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.grayLight,
    borderRadius: '100%',
    backgroundColor: theme.colors.white,

    ...props
  }),
  themeMiddleware
)

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    MarginProps,
    WidthProps,
    HeightProps,
    FlexChildProps {
  children?: ReactNode
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {children, ...props},
  ref
) {
  const [styleProps, elementProps] = extractStyleProps(props)
  return (
    <AvatarElement {...elementProps} ref={ref} styleProps={styleProps}>
      {children}
    </AvatarElement>
  )
})
