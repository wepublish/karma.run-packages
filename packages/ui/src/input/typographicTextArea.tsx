import React, {
  useEffect,
  useRef,
  TextareaHTMLAttributes,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  ChangeEvent
} from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware, Theme} from '../style/themeContext'

import {
  TypographyVariant,
  stylesForTypographyVariant,
  TypographyTextAlign
} from '../layout/typography'
import {LineHeight} from '../style/helpers'

interface InputWrapperProps {
  readonly variant: TypographyVariant
  readonly align: TypographyTextAlign
  readonly theme: Theme
}

const TextAreaWrapper = styled(
  'textarea',
  ({variant, align, theme}: InputWrapperProps) => ({
    display: 'block',

    width: '100%',
    resize: 'none',

    borderStyle: 'none',
    borderWidth: 0,
    borderColor: 'transparent',

    fontFamily: 'inherit',
    lineHeight: LineHeight.Default,

    color: theme.colors.dark,
    textAlign: align,
    ...stylesForTypographyVariant(variant),

    ':focus': {
      outline: 'none'
    },

    '::placeholder': {
      color: theme.colors.gray
    }
  }),
  themeMiddleware
)

const AutoSizeBuffer = 2

export interface TypographicTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly variant?: TypographyVariant
  readonly align?: TypographyTextAlign
}

export const TypographicTextArea = forwardRef<HTMLTextAreaElement, TypographicTextAreaProps>(
  ({variant = 'body1', align = 'left', onChange, ...props}, forwardRef) => {
    const ref = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(forwardRef, () => ref.current!, [ref.current])

    useLayoutEffect(() => {
      handleResize()
    }, [])

    useEffect(() => {
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => {
          handleResize()
        })

        observer.observe(ref.current)
        return () => observer.unobserve(ref.current)
      } else {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }
    }, [ref])

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      handleResize()
      onChange?.(e)
    }

    function handleResize() {
      ref.current!.style.overflow = 'hidden'
      ref.current!.style.height = 'auto'
      ref.current!.style.height = `${ref.current!.scrollHeight + AutoSizeBuffer}px`
    }

    return (
      <TextAreaWrapper
        ref={ref}
        {...props}
        styleProps={{variant, align}}
        onChange={handleChange}
        rows={1}
      />
    )
  }
)
