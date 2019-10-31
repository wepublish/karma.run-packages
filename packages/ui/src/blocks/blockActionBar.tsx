import React, {ReactNode} from 'react'

import {cssRule, useStyle} from '@karma.run/react'

import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/helpers'

const BlockActionBarStyle = cssRule({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: pxToRem(Spacing.ExtraSmall)
})

const CenterStyle = cssRule({
  display: 'flex',

  '& button': {
    marginLeft: pxToRem(Spacing.Tiny),
    marginRight: pxToRem(Spacing.Tiny)
  }
})

const SideStyle = cssRule({
  '&:first-child': {
    marginBottom: pxToRem(Spacing.ExtraSmall)
  }
})

export interface BlockActionBarProps {
  buttonsLeft?: ReactNode
  buttonsCenter?: ReactNode
  buttonsRight?: ReactNode
}

export function BlockActionBar({buttonsLeft, buttonsCenter, buttonsRight}: BlockActionBarProps) {
  const css = useStyle()
  return (
    <div className={css(BlockActionBarStyle)}>
      <div className={css(SideStyle)}>{buttonsLeft}</div>
      <div className={css(CenterStyle)}>{buttonsCenter}</div>
      <div className={css(SideStyle)}>{buttonsRight}</div>
    </div>
  )
}
