import React from 'react'
import {IconType, Icon, IconScale} from './icon'
import {cssRuleWithTheme, useThemeStyle, ThemeContext} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'

export interface InputStyleProps {
  hasError: boolean
}

export const InputContainerStyle = cssRuleWithTheme(({theme}) => ({
  minHeight: pxToRem(54),
  paddingTop: pxToRem(16)
}))

export const InputStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  position: 'relative',

  '> input': {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid',
    borderColor: hasError ? theme.colors.alert : theme.colors.gray,
    transition: `border-color ease-in ${TransitionDuration.Slow}`,

    fontSize: pxToRem(FontSize.Medium),

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':required:focus:valid': {
      borderColor: theme.colors.success
    },

    ':required:focus:valid + label': {
      color: theme.colors.success
    },

    ':required:focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':required:focus:invalid + label': {
      color: theme.colors.alert
    },

    ':required:invalid': {
      borderColor: theme.colors.alert
    },

    ':required:invalid + label': {
      color: theme.colors.alert
    },

    ':placeholder-shown + label': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + label': {
      color: theme.colors.action
    }
  },
  '> span': {
    position: 'absolute',
    left: '1px',
    top: '1px',
    fill: theme.colors.dark
  },
  '> span + input': {
    paddingLeft: pxToRem(Spacing.Medium)
  }
}))

const LabelStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  position: 'absolute',
  top: '-1.6rem',
  left: 0,
  fontSize: pxToRem(FontSize.Small),
  opacity: 1,
  transform: 'translateY(0%)',
  transition: 'transform ease-in-out, opacity ease-in-out, color ease-in-out',
  transitionDuration: TransitionDuration.Fast
}))

const DescriptionStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

export interface InputProps {
  readonly label?: string
  readonly value: string
  readonly placeholder: string
  readonly description: string
  readonly errorDescription?: string
  readonly icon?: IconType
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void
}

export function Input({
  label,
  placeholder,
  value,
  description,
  errorDescription,
  icon,
  onValueChange,
  className
}: InputProps) {
  const {css} = useThemeStyle<InputStyleProps>({hasError: errorDescription != null})

  const Input = (
    <input
      placeholder={placeholder}
      value={value}
      onChange={event => {
        onValueChange(event.target.value, event)
      }}
    />
  )

  return (
    <div className={joinClassNames(css(InputContainerStyle), className)}>
      <div className={joinClassNames(css(InputStyle))}>
        {icon ? (
          <>
            <Icon type={icon} scale={IconScale.Larger} /> {Input}
          </>
        ) : (
          Input
        )}
        <label className={css(LabelStyle)}>{label}</label>
      </div>

      <div className={css(DescriptionStyle)}>{errorDescription && description}</div>
    </div>
  )
}
