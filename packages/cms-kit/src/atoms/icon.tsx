import React from 'react'
import {cssRule, useStyle, joinClassNames} from '@karma.run/react'

import {DropHereIconSVG} from '../icons/dropHere'
import {ReplaceIconSVG} from '../icons/replace'

export enum IconType {
  DropHere = 'dropHere',
  Replace = 'replace'
}

export const IconStyle = cssRule({
  display: 'inline-block',
  height: '1em',

  '> svg': {height: '1em'}
})

export interface IconProps {
  readonly type: IconType
  readonly className?: string
}

export function Icon({type, className}: IconProps) {
  const {css} = useStyle()

  return (
    <span className={joinClassNames(css(IconStyle), className)} role="img">
      {iconForType(type)}
    </span>
  )
}

export function iconForType(type: IconType, color?: string) {
  switch (type) {
    case IconType.DropHere:
      return <DropHereIconSVG />

    case IconType.Replace:
      return <ReplaceIconSVG />
  }
}
