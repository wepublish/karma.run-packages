import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'
import {pxToRem, FontSize, TransitionDuration, BorderWidth} from '../style/helpers'

export interface TextAreaStyleProps {
  hasError: boolean
}

const TextAreaContainerStyle = cssRuleWithTheme(({theme}) => ({
  minHeight: pxToRem(54),
  paddingTop: pxToRem(16)
}))

const TextAreaStyle = cssRuleWithTheme<TextAreaStyleProps>(({hasError, theme}) => ({
  position: 'relative',

  '> textarea': {
    width: '100%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',

    borderBottomWidth: BorderWidth.Small,
    borderBottomStyle: 'solid',
    borderBottomColor: hasError ? theme.colors.alert : theme.colors.gray,

    transitionProperty: 'border-bottom-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    resize: 'none',

    fontSize: pxToRem(FontSize.Medium),

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderBottomColor: theme.colors.action
    },

    ':placeholder-shown + label': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + label': {
      color: theme.colors.action
    }
  }
}))

const LabelStyle = cssRuleWithTheme<TextAreaStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  position: 'absolute',
  top: '-1.6rem',
  left: 0,
  fontSize: pxToRem(FontSize.Small),
  opacity: 1,
  transform: 'translateY(0%)',

  transitionProperty: 'transform, opacity, color',
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: TransitionDuration.Fast
}))

const DescriptionStyle = cssRuleWithTheme<TextAreaStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

export interface TextAreaProps {
  readonly label?: string
  readonly value: string
  readonly placeholder: string
  readonly description: string
  readonly errorDescription?: string
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLTextAreaElement>): void
}

export function TextArea({
  label,
  value,
  placeholder,
  description,
  errorDescription,
  onValueChange,
  className
}: TextAreaProps) {
  const css = useThemeStyle<TextAreaStyleProps>({hasError: errorDescription != null})

  return (
    <div className={joinClassNames(css(TextAreaContainerStyle), className)}>
      <div className={joinClassNames(css(TextAreaStyle))}>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={event => {
            onValueChange(event.target.value, event)
          }}
        />
        <label className={css(LabelStyle)}>{label}</label>
      </div>
      <div className={css(DescriptionStyle)}>{errorDescription || description}</div>
    </div>
  )
}
