import React from 'react'
import {cssRule, useStyle} from '@karma.run/react'
import {Button} from '../input/buttons/button'

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
      {cancelLabel && <Button variant="text" label={cancelLabel} onClick={onCancel} />}
      <Button label={confirmLabel} onClick={onConfirm} variant="outlined" />
    </div>
  )
}
