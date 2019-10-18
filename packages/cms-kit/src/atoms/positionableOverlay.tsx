import React, {ReactNode} from 'react'
import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem, TransitionDuration} from '../style/helpers'

interface OverlayStyleProps {
  top: number
  left: number
  show: boolean
  isFixed: boolean
}

const OverlayStyle = cssRule<OverlayStyleProps>(({top, left, isFixed, show}) => ({
  position: isFixed ? 'fixed' : 'absolute',
  opacity: show ? 1 : 0,
  top: pxToRem(top),
  left: pxToRem(left),
  transition: `opacity ${TransitionDuration.Fast}`
}))

/**
 *
 * Fix or Absolute positionable Overlay Component
 * Parent to which it should be positioned relative must have css prop: position
 */
export interface PositionableOverlayProps {
  readonly top: number
  readonly left: number
  readonly show: boolean
  readonly children: ReactNode
  readonly positionIsFixed?: boolean
}

export const PositionableOverlay = React.forwardRef(
  (
    {top, left, show, positionIsFixed = false, children}: PositionableOverlayProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {css} = useStyle({top: top, left: left, show: show, isFixed: positionIsFixed})
    return (
      <div className={css(OverlayStyle)} ref={ref}>
        {children}
      </div>
    )
  }
)
