import React, {ReactNode, forwardRef} from 'react'
import {styled} from '@karma.run/react'

import {themeMiddleware, Theme} from '../style/themeContext'

import {
  BorderRadius,
  BorderWidth,
  PaddingProps,
  MarginProps,
  WidthProps,
  HeightProps,
  FlexChildProps,
  FlexContainerProps,
  extractStyleProps,
  DisplayProps
} from '../style/helpers'

interface CardElementProps
  extends PaddingProps,
    MarginProps,
    WidthProps,
    HeightProps,
    FlexChildProps,
    FlexContainerProps,
    DisplayProps {
  readonly theme: Theme
}

export const CardElement = styled(
  'div',
  ({theme, ...props}: CardElementProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Card' : undefined,

    borderStyle: 'solid',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.grayLight,
    borderRadius: BorderRadius.Small,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',

    ...props
  }),
  themeMiddleware
)

export interface CardProps
  extends PaddingProps,
    MarginProps,
    WidthProps,
    HeightProps,
    FlexChildProps,
    FlexContainerProps,
    DisplayProps {
  readonly children?: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({children, ...props}, ref) {
  const [styleProps, elementProps] = extractStyleProps(props)
  return (
    <CardElement {...elementProps} ref={ref} styleProps={styleProps}>
      {children}
    </CardElement>
  )
})
