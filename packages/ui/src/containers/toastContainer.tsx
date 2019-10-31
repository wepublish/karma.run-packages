import React, {createContext, Dispatch, ReactNode} from 'react'
import {cssRule, useStyle} from '@karma.run/react'
import {Toast, ToastType} from '../atoms/toast'
import {pxToRem, Spacing} from '../style/helpers'

export type ToastAction = {}

export const ToastDispatchContext = createContext<Dispatch<ToastAction> | null>(null)

export interface ToastContainerProps {
  children: ReactNode
}

const ToastContainerStyle = cssRule(() => ({
  position: 'fixed',
  left: '50%',
  right: 'auto',
  transform: 'translate(-50%)'
}))

const ToastWrapperStyle = cssRule(() => ({
  margin: pxToRem(Spacing.ExtraSmall)
}))

// const ToastAnimation = cssKeyframes(() => ({
//   from: {
//     opacity: 0
//   },
//   to: {
//     opacity: 1
//   }
// }))

export function ToastContainer({children}: ToastContainerProps) {
  const css = useStyle()

  return (
    <>
      <div className={css(ToastContainerStyle)}>
        <div className={css(ToastWrapperStyle)}>
          <Toast type={ToastType.Error}>Error</Toast>
        </div>
        <div className={css(ToastWrapperStyle)}>
          <Toast type={ToastType.Error}>Error</Toast>
        </div>
        <div className={css(ToastWrapperStyle)}>
          <Toast type={ToastType.Error}>Error</Toast>
        </div>
      </div>
      {children}
    </>
  )
}
