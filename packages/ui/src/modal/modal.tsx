import React, {ReactNode, useEffect, useContext, createContext, useReducer} from 'react'
import {createPortal} from 'react-dom'
import {Transition} from 'react-transition-group'
import {styled} from '@karma.run/react'
import {TransitionStatus} from 'react-transition-group/Transition'

import {
  hexToRgba,
  TransitionDuration,
  TransitionDurationRaw,
  ZIndex,
  BlurStrength
} from '../style/helpers'

import {themeMiddleware, Theme} from '../style/themeContext'

export const ModalContext = createContext<React.Dispatch<ModalContextAction> | null>(null)

export interface ModalContextActionPush {
  type: 'push'
}

export interface ModalContextActionPop {
  type: 'pop'
}

export type ModalContextAction = ModalContextActionPush | ModalContextActionPop

interface ModalContextState {
  numOpenModals: number
}

const initialState = {numOpenModals: 0}

function modalContextReducer(
  {numOpenModals}: ModalContextState,
  action: ModalContextAction
): ModalContextState {
  switch (action.type) {
    case 'push':
      return {numOpenModals: numOpenModals + 1}

    case 'pop':
      if (numOpenModals - 1 < 0) {
        console.warn('Unbalanced calls to push/pop.')
      }

      return {numOpenModals: numOpenModals - 1}
  }
}

export interface ModalContextProviderProps {
  children?: ReactNode
}

export function ModalContextProvider({children}: ModalContextProviderProps) {
  const [state, dispatch] = useReducer(modalContextReducer, initialState)
  const shouldHideScrollbars = state.numOpenModals > 0

  useEffect(() => {
    if (shouldHideScrollbars) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    }
  }, [shouldHideScrollbars])

  useEffect(() => {
    return () => {
      document.body.style.paddingRight = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  return <ModalContext.Provider value={dispatch}>{children}</ModalContext.Provider>
}

export function useModalContext() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('No ModalContextProvider found in component tree.')
  }

  return context
}

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
    backdropFilter: `blur(${BlurStrength.Strong})`,
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
  const dispatch = useModalContext()

  useEffect(() => {
    if (open) {
      dispatch({type: 'push'})
      return () => dispatch({type: 'pop'})
    }

    return () => {}
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
