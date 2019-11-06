import React from 'react'
import {styled} from '@karma.run/react'
import {TransitionDuration, pxToRem} from '../style/helpers'
import {TransitionStatus} from 'react-transition-group/Transition'
import {Modal, ModalProps} from './modal'
import {themeMiddleware, Theme} from '../style/themeContext'

interface DrawerWrapperProps {
  readonly transitionStatus: TransitionStatus
  readonly width?: number | string
  readonly theme: Theme
}

const DrawerWrapper = styled(
  'div',
  ({transitionStatus, width, theme}: DrawerWrapperProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Drawer' : undefined,

    position: 'absolute',
    right: 0,

    width: typeof width === 'number' ? pxToRem(width) : width,
    height: '100vh',

    overflowX: 'hidden',
    overflowY: 'auto',

    backgroundColor: theme.colors.white,

    boxShadow:
      transitionStatus === 'entered'
        ? '0 0 10px 0 rgba(0, 0, 0, 0.2)'
        : '0 0 10px 0 rgba(0, 0, 0, 0)',

    transform: transitionStatus === 'entered' ? 'translateX(0)' : 'translateX(100%)',

    transitionProperty: 'transform box-shadow',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

export interface DrawerProps extends ModalProps {
  readonly width?: number
}

export function Drawer({children, width, ...props}: DrawerProps) {
  return (
    <Modal {...props}>
      {transitionStatus => (
        <DrawerWrapper styleProps={{transitionStatus, width}}>
          {children && children(transitionStatus)}
        </DrawerWrapper>
      )}
    </Modal>
  )
}
