import React from 'react'
import {TextButton} from './textButton'
import {OutlineButton} from './outlineButton'
import {cssRule, useStyle} from '@karma.run/react'

const ButtonBarStyle = cssRule({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
})

export interface ButtonBarProps {
  readonly confirmLabel: string
  readonly cancelLabel?: string
  onConfirm(): void
  onCancel?(): void
}

export function ButtonBar({confirmLabel, cancelLabel, onConfirm, onCancel}: ButtonBarProps) {
  const css = useStyle()
  return (
    <div className={css(ButtonBarStyle)}>
      {cancelLabel && <TextButton label={cancelLabel} onClick={onCancel} />}
      <OutlineButton label={confirmLabel} onClick={onConfirm} />
    </div>
  )
}
