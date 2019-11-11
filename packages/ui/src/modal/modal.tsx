import React, {ReactNode, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Transition} from 'react-transition-group'
import {styled} from '@karma.run/react'
import {hexToRgba, TransitionDuration, TransitionDurationRaw, ZIndex} from '../style/helpers'
import {themeMiddleware, Theme} from '../style/themeContext'
import {TransitionStatus} from 'react-transition-group/Transition'

const ModalWrapper = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Modal' : undefined,

  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  zIndex: ZIndex.Modal
}))

interface ModalBackdropProps {
  transitionStatus: TransitionStatus
  theme: Theme
}

const ModalBackdrop = styled(
  'div',
  ({theme, transitionStatus}: ModalBackdropProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'ModalBackdrop' : undefined,

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    backgroundColor: hexToRgba(theme.colors.dark, 0.5),
    backdropFilter: 'blur(2px)',
    transitionProperty: 'opacity',
    transitionDuration: TransitionDuration.Slow,

    opacity: transitionStatus === 'entered' ? 1 : 0
  }),
  themeMiddleware
)

const ModalContent = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ModalContent' : undefined,

  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}))

export interface ModalProps {
  readonly open: boolean
  readonly closeOnBackgroundClick?: boolean

  onClose?: () => void
  children?: (transitionStatus: TransitionStatus) => ReactNode
}

export function Modal({children, onClose, open, closeOnBackgroundClick}: ModalProps) {
  useEffect(() => {
    // TODO: Move into context
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.paddingRight = open ? `${scrollbarWidth}px` : ''
    document.documentElement.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <Transition in={open} timeout={TransitionDurationRaw.Slow} unmountOnExit>
      {transitionStatus =>
        createPortal(
          <ModalWrapper>
            <ModalBackdrop styleProps={{transitionStatus}} />
            <ModalContent
              onClick={e =>
                closeOnBackgroundClick && e.target === e.currentTarget && onClose && onClose()
              }>
              {children && children(transitionStatus)}
            </ModalContent>
          </ModalWrapper>,
          document.body
        )
      }
    </Transition>
  )
}
