import React from 'react'
import {styled, padding} from '@karma.run/react'

import {TransitionDuration, pxToRem, BorderRadius, Spacing} from '../style/helpers'
import {TransitionStatus} from 'react-transition-group/Transition'
import {Modal, ModalProps} from './modal'

interface DialogWrapperProps {
  readonly transitionStatus: TransitionStatus
}

const DialogWrapper = styled('div', ({transitionStatus}: DialogWrapperProps) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Dialog' : undefined,

  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',

  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%) ${transitionStatus === 'entered' ? 'scale(1)' : 'scale(0.5)'}`,

  maxHeight: '100vh',
  opacity: transitionStatus === 'entered' ? 1 : 0,

  transitionProperty: 'transform opacity',
  transitionDuration: TransitionDuration.Slow,

  ...padding(pxToRem(Spacing.Large))
}))

interface DialogContentWrapperProps {
  readonly width?: number
}

const DialogContentWrapper = styled('div', ({width}: DialogContentWrapperProps) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'DialogContentWrapper' : undefined,

  display: 'flex',
  width: typeof width === 'number' ? pxToRem(width) : width,
  overflow: 'hidden',

  borderRadius: BorderRadius.Medium,
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
}))

const DialogContent = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'DialogContent' : undefined,

  width: '100%',
  overflowX: 'hidden',
  overflowY: 'auto'
}))

export interface DialogProps extends ModalProps {
  readonly width?: number
}

export function Dialog({children, width, ...props}: DialogProps) {
  return (
    <Modal {...props}>
      {transitionStatus => (
        <DialogWrapper styleProps={{transitionStatus}}>
          <DialogContentWrapper styleProps={{width}}>
            <DialogContent>{children && children(transitionStatus)}</DialogContent>
          </DialogContentWrapper>
        </DialogWrapper>
      )}
    </Modal>
  )
}
