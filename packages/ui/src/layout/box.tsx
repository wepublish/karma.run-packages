import React, {ReactNode, forwardRef, Ref} from 'react'

import {OverflowProperty} from 'csstype'
import {cssRule, useStyle} from '@karma.run/react'

import {
  FlexContainerProps,
  FlexChildProps,
  WidthProps,
  HeightProps,
  PaddingProps,
  MarginProps,
  DisplayProps
} from '../style/helpers'

export interface BaseBoxProps
  extends FlexContainerProps,
    FlexChildProps,
    WidthProps,
    HeightProps,
    PaddingProps,
    MarginProps,
    DisplayProps {
  readonly overflow?: OverflowProperty
  readonly element?: keyof JSX.IntrinsicElements
  readonly children?: ReactNode | ((props: {className: string; ref: Ref<any>}) => ReactNode)
}

type BoxStyleProps = Omit<BaseBoxProps, 'element' | 'children'>

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
  const style = useStyle(props)
  const className = style(BoxBaseStyle)

  const Element = element as any
  const anyChildren = children as any

  return typeof anyChildren === 'function' ? (
    anyChildren({className, ref})
  ) : (
    <Element className={className} ref={ref}>
      {children}
    </Element>
  )
})
