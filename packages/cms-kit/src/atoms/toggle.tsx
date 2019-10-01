import React, {ChangeEvent} from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, BorderWidth, TransitionDuration} from '../style/helpers'
import {BaseInput, InputType} from './baseInput'

const ToggleInputStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  opacity: 0,

  ':checked + span': {
    borderColor: theme.colors.successDark,
    backgroundColor: theme.colors.success
  },

  ':checked + span::after': {
    transform: `translate(${pxToRem(50 - 26)})`,
    borderStyle: 'solid',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.successDark
  }
}))

const ToggleStyle = cssRuleWithTheme(({theme}) => ({
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',

  width: pxToRem(50),
  height: pxToRem(26),

  borderStyle: 'solid',
  borderWidth: BorderWidth.Small,
  borderColor: theme.colors.gray,
  borderRadius: pxToRem(26),
  backgroundColor: theme.colors.light,

  transitionProperty: 'background-color, border-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  '::after': {
    content: '""',
    position: 'absolute',
    top: `-${BorderWidth.Small}`,
    left: `-${BorderWidth.Small}`,

    width: pxToRem(26),
    height: pxToRem(26),

    borderRadius: pxToRem(26),
    border: `${pxToRem(1)} solid ${theme.colors.gray}`,
    backgroundColor: theme.colors.white,

    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Fast
  },

  ':checked': {
    borderColor: theme.colors.successDark
  }
}))

const ToggleWrapperStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
}))

const ToggleTextWrapperStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: pxToRem(FontSize.Medium),
  color: theme.colors.dark
}))

const ToggleLabelStyle = cssRuleWithTheme(({theme}) => ({}))

const ToggleDescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

export interface ToggleProps {
  readonly label?: string
  readonly description?: string
  readonly name?: string
  readonly checked?: boolean
  readonly disabled?: boolean

  onChange?(event: ChangeEvent<HTMLInputElement>): void
}

export function Toggle({label, description, ...props}: ToggleProps) {
  const {css} = useThemeStyle()

  return (
    <label className={css(ToggleWrapperStyle)}>
      {(label || description) && (
        <span className={css(ToggleTextWrapperStyle)}>
          <span className={css(ToggleLabelStyle)}>{label}</span>
          <span className={css(ToggleDescriptionStyle)}>{description}</span>
        </span>
      )}
      <BaseInput {...props} type={InputType.Checkbox} style={ToggleInputStyle} />
      <span className={css(ToggleStyle)} />
    </label>
  )
}
