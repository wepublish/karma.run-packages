import React, {ReactNode} from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'
import {TextButton} from './textButton'
import {OutlineButton} from '..'

const OverlayBackgroundStyle = cssRuleWithTheme(({theme}) => ({
  position: 'fixed',
  width: '100%',
  height: '100%'
}))

const OverlayStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  borderRadius: pxToRem(10),
  overflow: 'hidden',
  padding: pxToRem(Spacing.Small),
  maxWidth: '500px'
}))

const OverlayTitleStyle = cssRuleWithTheme(({theme}) => ({
  textAlign: 'center'
}))

const OverlayButtonsStyle = cssRuleWithTheme(({theme}) => ({
  float: 'right'
}))

export interface OverlayProps {
  readonly title: string
  readonly children: ReactNode
  onConfirm?(): void
  onCancel?(): void
}

export function Overlay({title, children, onConfirm, onCancel}: OverlayProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(OverlayBackgroundStyle)}>
      <div className={css(OverlayStyle)}>
        <h3 className={css(OverlayTitleStyle)}>{title}</h3>
        {children}
        <div className={css(OverlayButtonsStyle)}>
          {onCancel && <TextButton label={'Cancel'} onClick={onCancel} />}
          {onConfirm && <OutlineButton label={'Confirm'} onClick={onConfirm} />}
        </div>
      </div>
    </div>
  )
}
