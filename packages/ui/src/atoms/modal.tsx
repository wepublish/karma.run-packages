import React, {ReactNode} from 'react'

import {TextButton} from './textButton'
import {OutlineButton} from './outlineButton'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing, ZIndex, BorderRadius, whenTablet, whenMobile} from '../style/helpers'
import {Typography} from '../layout/typography'

const ModalStyle = cssRuleWithTheme(({theme}) => ({
  position: 'fixed',
  zIndex: ZIndex.Modal,
  top: pxToRem(40),
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden'
}))

const ModalDialogStyle = cssRuleWithTheme(({theme}) => ({
  width: '40%',
  position: 'relative',
  backgroundColor: theme.colors.white,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  border: '1px solid',
  borderColor: theme.colors.grayLight,
  borderRadius: pxToRem(BorderRadius.Medium),
  padding: pxToRem(Spacing.Small),
  overflow: 'hidden',

  ...whenTablet({
    width: '60%'
  }),

  ...whenMobile({
    width: '96%'
  })
}))

const ModalHeaderStyle = cssRuleWithTheme(({theme}) => ({
  textAlign: 'center',
  marginBottom: pxToRem(Spacing.Large)
}))

const ModalBodyStyle = cssRuleWithTheme(({theme}) => ({
  marginBottom: pxToRem(Spacing.Large)
}))

const ModalFooterStyle = cssRuleWithTheme(({theme}) => ({
  float: 'right',

  '> button': {
    marginLeft: pxToRem(Spacing.ExtraSmall)
  }
}))

const ModalBackdropStyle = cssRuleWithTheme(({theme}) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: ZIndex.ModalBackdrop,
  backgroundColor: 'rgba(255,255,255,0.85)'
}))

export interface ModalProps {
  readonly title: string
  readonly children: ReactNode
  onConfirm?(): void
  onCancel?(): void
}

export function Modal({title, children, onConfirm, onCancel}: ModalProps) {
  const css = useThemeStyle()
  return (
    <React.Fragment>
      <div className={css(ModalStyle)}>
        <div className={css(ModalDialogStyle)}>
          <div className={css(ModalHeaderStyle)}>
            <Typography variant="h3">{title}</Typography>
          </div>
          <div className={css(ModalBodyStyle)}>{children}</div>
          <div className={css(ModalFooterStyle)}>
            {onCancel && <TextButton label={'Cancel'} onClick={onCancel} />}
            {onConfirm && <OutlineButton label={'Confirm'} onClick={onConfirm} />}
          </div>
        </div>
      </div>
      <div className={css(ModalBackdropStyle)} />
    </React.Fragment>
  )
}
