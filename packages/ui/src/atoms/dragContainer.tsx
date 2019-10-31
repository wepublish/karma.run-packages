import React, {ReactNode} from 'react'
import {cssRule, useStyle} from '@karma.run/react'

const DragContainerStyle = cssRule({
  position: 'relative'
})

export interface DragContainerProps {
  readonly children: ReactNode
}

export function DragContainer({children}: DragContainerProps) {
  const css = useStyle()

  return <div className={css(DragContainerStyle)}>{children}</div>
}
