import React, {ChangeEvent} from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {FontSize, BorderWidth, TransitionDuration} from '../style/helpers'

const ToggleInputStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  opacity: 0,

  ':checked + span': {
    borderColor: theme.colors.successDark,
    backgroundColor: theme.colors.success
  },

  ':checked + span::after': {
    transform: `translate(${50 - 26}px)`,
    borderStyle: 'solid',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.successDark
  },

  ':disabled + span': {
    borderColor: theme.colors.grayDark,
    backgroundColor: theme.colors.gray
  },

  ':disabled:checked + span:after': {
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.grayDark
  }
}))

const ToggleStyle = cssRuleWithTheme(({theme}) => ({
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',

  width: 50,
  height: 26,

  borderStyle: 'solid',
  borderWidth: BorderWidth.Small,
  borderColor: theme.colors.gray,
  borderRadius: 26,
  backgroundColor: theme.colors.light,

  transitionProperty: 'background-color, border-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  '::after': {
    content: '""',
    position: 'absolute',
    top: `-${BorderWidth.Small}`,
    left: `-${BorderWidth.Small}`,

    width: 26,
    height: 26,

    borderRadius: 26,
    border: `1px solid ${theme.colors.gray}`,
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
  fontSize: FontSize.Medium,
  color: theme.colors.dark
}))

const ToggleLabelStyle = cssRuleWithTheme(({theme}) => ({}))

const ToggleDescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray,
  fontSize: FontSize.Small
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
  const css = useThemeStyle()

  return (
    <label className={css(ToggleWrapperStyle)}>
      {(label || description) && (
        <span className={css(ToggleTextWrapperStyle)}>
          <span className={css(ToggleLabelStyle)}>{label}</span>
          <span className={css(ToggleDescriptionStyle)}>{description}</span>
        </span>
      )}
      <input {...props} type="checkbox" className={css(ToggleInputStyle)} />
      <span className={css(ToggleStyle)} />
    </label>
  )
}
