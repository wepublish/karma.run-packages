import React, {ChangeEvent} from 'react'

import {IconType, Icon} from './icon'
import {BaseInput, InputType} from './baseInput'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing, BorderWidth} from '../style/helpers'
import {cssRule} from '@karma.run/react'

interface TextInputStyleProps {
  hasError: boolean
}

const TextInputContainerStyle = cssRuleWithTheme(() => ({
  minHeight: pxToRem(54),
  paddingTop: pxToRem(16)
}))

const TextInputWrapperStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  fontSize: pxToRem(FontSize.Medium),
  fill: theme.colors.dark,

  borderBottomWidth: BorderWidth.Small,
  borderBottomStyle: 'solid',
  borderBottomColor: hasError ? theme.colors.alert : theme.colors.gray
}))

const IconStyle = cssRule(() => ({
  marginRight: pxToRem(Spacing.Tiny)
}))

const TextInputStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  width: '100%',

  transitionProperty: 'border-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow,

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

  ':required:focus:invalid + span': {
    color: theme.colors.alert
  },

  ':required:invalid': {
    borderColor: theme.colors.alert
  },

  ':required:invalid + span': {
    color: theme.colors.alert
  },

  ':placeholder-shown + span': {
    opacity: 0,
    transform: 'translateY(30%)'
  },

  ':focus + span': {
    color: theme.colors.action
  }
}))

const LabelStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
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

const DescriptionStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

export interface TextInputProps {
  readonly label?: string
  readonly value: string
  readonly description?: string
  readonly errorDescription?: string
  readonly icon?: IconType
  readonly disabled?: boolean

  onChange(event: ChangeEvent<HTMLInputElement>): void
}

export function TextInput({label, description, errorDescription, icon, ...props}: TextInputProps) {
  const styleProps = {hasError: errorDescription != null}
  const {css} = useThemeStyle<TextInputStyleProps>(styleProps)

  return (
    <div className={css(TextInputContainerStyle)}>
      <label className={css(TextInputWrapperStyle)}>
        {icon && <Icon type={icon} style={IconStyle} />}
        <BaseInput
          type={InputType.Text}
          placeholder={label}
          style={TextInputStyle}
          styleProps={styleProps}
          {...props}
        />
        <span className={css(LabelStyle)}>{label}</span>
      </label>
      <div className={css(DescriptionStyle)}>{errorDescription || description}</div>
    </div>
  )
}
