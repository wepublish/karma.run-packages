import React, {useEffect, useRef, TextareaHTMLAttributes, ChangeEvent} from 'react'
import {styled} from '@karma.run/react'
import {themeMiddleware, Theme} from '../../style/themeContext'

import {
  TypographyVariant,
  stylesForTypographyVariant,
  TypographyTextAlign
} from '../../layout/typography'

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

export interface TypographyTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly variant?: TypographyVariant
  readonly align?: TypographyTextAlign
}

export function TypograpyTextArea({
  variant = 'body1',
  align = 'left',
  onChange,
  ...props
}: TypographyTextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    function handleResize() {
      ref.current!.style.height = 'inherit'
      ref.current!.style.height = `${ref.current!.scrollHeight}px`
    }

    // TODO: Consider using resize observer
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`

    onChange?.(e)
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
