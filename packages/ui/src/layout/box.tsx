import React, {ReactNode, forwardRef, Ref, HTMLAttributes} from 'react'
import {cssRule, useStyle} from '@karma.run/react'

import {
  FlexContainerProps,
  FlexChildProps,
  WidthProps,
  HeightProps,
  PaddingProps,
  MarginProps,
  DisplayProps,
  OverflowProps,
  extractStyleProps
} from '../style/helpers'

interface BoxStyleProps
  extends FlexContainerProps,
    FlexChildProps,
    WidthProps,
    HeightProps,
    PaddingProps,
    MarginProps,
    DisplayProps,
    OverflowProps {}

export interface BaseBoxProps extends HTMLAttributes<any>, BoxStyleProps {
  readonly element?: keyof JSX.IntrinsicElements
  readonly children?: ReactNode | ((props: {className: string; ref: Ref<any>}) => ReactNode)
}

const BoxBaseStyle = cssRule<BoxStyleProps>(props => {
  return {
    _className: process.env.NODE_ENV !== 'production' ? 'Box' : undefined,
    ...props
  }
})

export const Box = forwardRef<any, BaseBoxProps>(function Box(
  {element = 'div', children, ...props},
  ref
) {
  const [layoutProps, elementProps] = extractStyleProps(props)

  const style = useStyle(layoutProps)
  const className = style(BoxBaseStyle)

  const Element = element as any
  const anyChildren = children as any

  return typeof anyChildren === 'function' ? (
    anyChildren({...elementProps, className, ref})
  ) : (
    <Element {...elementProps} className={className} ref={ref}>
      {children}
    </Element>
  )
})
