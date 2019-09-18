import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export interface InputStyleProps {
  hasError: boolean
}

export const InputStyle = cssRuleWithTheme(({theme}) => ({
  // todo
}))

const LabelStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action
}))

const DescriptionStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action
}))

export interface InputProps {
  readonly label?: string
  readonly placeholder: string
  readonly description: string
  readonly errorDescription?: string
  readonly icon?: IconType
  readonly className?: string
  onValueChange(value: React.ChangeEvent<HTMLInputElement>): void
}

export function Input({
  label,
  placeholder,
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
      onChange={event => {
        onValueChange(event)
      }}
    />
  )

  return (
    <div className={joinClassNames(css(InputStyle), className)}>
      <div className={css(LabelStyle)}>{label}</div>
      <div>
        {icon ? (
          <>
            <Icon type={icon} /> {Input}
          </>
        ) : (
          Input
        )}
      </div>
      <div className={css(DescriptionStyle)}>{errorDescription && description}</div>
    </div>
  )
}
