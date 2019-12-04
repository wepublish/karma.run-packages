import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import {styled} from '@karma.run/react'
import {WidthProperty} from 'csstype'
import {ZIndex} from '../style/helpers'

export const LayerContainer = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'LayerContainer' : undefined,

  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%'
}))

const LayerElement = styled('div', (props: LayerStyleProps) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Layer' : undefined,

  position: 'absolute',
  zIndex: ZIndex.Default,

  ...props
}))

interface LayerStyleProps {
  readonly top?: number
  readonly bottom?: number

  readonly left?: number
  readonly right?: number

  readonly width?: WidthProperty<number>
  readonly height?: string | number

  readonly minWidth?: string | number
  readonly minHeight?: string | number

  readonly maxWidth?: string | number
  readonly maxHeight?: string | number
}

export interface LayerProps extends HTMLAttributes<HTMLDivElement>, LayerStyleProps {
  readonly children?: ReactNode
}

export const Layer = forwardRef<HTMLDivElement, LayerProps>(function Layer(
  {
    top,
    bottom,
    left,
    right,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    children,
    ...props
  },
  ref
) {
  return (
    <LayerElement
      {...props}
      ref={ref}
      styleProps={{
        top,
        bottom,
        left,
        right,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight
      }}>
      {children}
    </LayerElement>
  )
})
