import React, {forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {styled, cssRule} from '@karma.run/react'

import {themeMiddleware, Theme} from '../style/themeContext'

import {
  FontSize,
  TransitionDuration,
  Spacing,
  BorderWidth,
  hexToRgba,
  WidthProps,
  MarginProps,
  FlexChildProps,
  extractStyleProps
} from '../style/helpers'

import {IconElement, Icon} from '../data/icon'

export type ButtonVariant = 'default' | 'outlined' | 'text'
export type ButtonColor = 'default' | 'primary' | 'secondary'

interface ButtonStyleProps extends WidthProps, MarginProps, FlexChildProps {
  readonly disabled?: boolean
  readonly variant: ButtonVariant
  readonly color: ButtonColor
  readonly theme: Theme
}

function getMainColor({color, disabled, theme}: ButtonStyleProps) {
  if (disabled) return theme.colors.grayLight

  switch (color) {
    case 'primary':
      return theme.colors.primary

    case 'secondary':
      return theme.colors.action

    case 'default':
      return theme.colors.grayDark
  }
}

function getActiveMainColor({color, theme}: ButtonStyleProps) {
  switch (color) {
    case 'primary':
      return theme.colors.primaryDark

    case 'secondary':
      return theme.colors.actionDark

    case 'default':
      return theme.colors.dark
  }
}

function getTextColor(props: ButtonStyleProps) {
  const {variant, disabled, theme} = props

  switch (variant) {
    case 'outlined':
    case 'text':
      if (disabled) return theme.colors.grayLight
      return getMainColor(props)

    case 'default':
      if (disabled) return theme.colors.gray
      return theme.colors.white
  }
}

function getActiveTextColor(props: ButtonStyleProps) {
  const {variant, theme} = props

  switch (variant) {
    case 'outlined':
      return getActiveMainColor(props)

    case 'text':
    case 'default':
      return theme.colors.white
  }
}

const ButtonStyle = cssRule<ButtonStyleProps>(props => {
  const {color, variant, disabled, theme, ...styleProps} = props

  const backgroundColor = getMainColor(props)
  const activeBackgroundColor = getActiveMainColor(props)

  const textColor = getTextColor(props)
  const activeTextColor = getActiveTextColor(props)

  return {
    _className: process.env.NODE_ENV !== 'production' ? 'Button' : undefined,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: Spacing.ExtraSmall,
    paddingBottom: Spacing.ExtraSmall,

    paddingLeft: Spacing.Small,
    paddingRight: Spacing.Small,

    cursor: disabled ? 'default' : 'pointer',
    fontSize: FontSize.Medium,
    borderRadius: Spacing.ExtraSmall,

    color: textColor,
    fontFamily: 'inherit',
    textAlign: 'center',
    lineHeight: 1.2,
    fill: textColor,

    borderWidth: BorderWidth.Small,
    borderStyle: 'solid',
    borderColor: variant === 'outlined' ? backgroundColor : 'transparent',
    backgroundColor: variant === 'default' ? backgroundColor : 'transparent',

    pointerEvents: disabled ? 'none' : undefined,

    transitionProperty: 'color background-color box-shadow',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Fast,

    ...styleProps,

    ':link': {
      color: textColor
    },

    ':visited': {
      color: textColor
    },

    ':hover': {
      color: activeTextColor,
      borderColor: variant === 'outlined' ? activeBackgroundColor : undefined,
      backgroundColor: variant === 'outlined' ? undefined : activeBackgroundColor,
      fill: activeTextColor
    },

    ':active': {
      color: theme.colors.grayLight,
      backgroundColor: activeBackgroundColor,
      fill: theme.colors.grayLight,
      boxShadow: `0 0 15px 0 ${hexToRgba(activeBackgroundColor, 0.6)}`
    },

    ':focus': {
      outline: 'none',
      boxShadow: `0 0 10px 0 ${hexToRgba(backgroundColor, 0.6)}`
    }
  }
})

export interface BaseButtonProps extends WidthProps, MarginProps, FlexChildProps {
  readonly icon?: IconElement
  readonly label: string
  readonly disabled?: boolean
  readonly color?: ButtonColor
  readonly variant?: ButtonVariant
  readonly outlined?: boolean
}

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
export type LinkButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

const ButtonElement = styled('button', ButtonStyle, themeMiddleware)
const LinkButtonElement = styled('a', ButtonStyle, themeMiddleware)

const ButtonIcon = styled('span', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ButtonIcon' : undefined,
  marginRight: Spacing.Tiny,
  marginLeft: -Spacing.Tiny
}))

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {icon, label, disabled, color = 'default', variant = 'default', ...props},
  ref
) {
  const [styleProps, elementProps] = extractStyleProps(props)

  return (
    <ButtonElement
      {...elementProps}
      ref={ref}
      styleProps={{disabled, color, variant, ...styleProps}}
      disabled={disabled}>
      {icon && (
        <ButtonIcon>
          <Icon element={icon} block />
        </ButtonIcon>
      )}
      {label}
    </ButtonElement>
  )
})

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  {icon, label, disabled, color = 'default', variant = 'default', ...props},
  ref
) {
  const [styleProps, elementProps] = extractStyleProps(props)

  return (
    <LinkButtonElement
      {...elementProps}
      ref={ref}
      styleProps={{disabled, color, variant, ...styleProps}}
      tabIndex={disabled ? -1 : elementProps.tabIndex}>
      {icon && (
        <ButtonIcon>
          <Icon element={icon} block />
        </ButtonIcon>
      )}
      {label}
    </LinkButtonElement>
  )
})
