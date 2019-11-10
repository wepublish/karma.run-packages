import React, {forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {styled, cssRule} from '@karma.run/react'

import {themeMiddleware, Theme} from '../style/themeContext'

import {
  pxToRem,
  FontSize,
  TransitionDuration,
  Spacing,
  BorderWidth,
  hexToRgba
} from '../style/helpers'

import {IconType, Icon} from '../atoms/icon'

export type ButtonVariant = 'default' | 'outlined' | 'text'
export type ButtonColor = 'default' | 'primary' | 'secondary'

interface ButtonStyleProps {
  readonly fill?: boolean
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
      return theme.colors.dark
  }
}

function getActiveMainColor({color, theme}: ButtonStyleProps) {
  switch (color) {
    case 'primary':
      return theme.colors.primaryDark

    case 'secondary':
      return theme.colors.actionDark

    case 'default':
      return theme.colors.grayDark
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
  const {disabled, fill, variant, theme} = props

  const backgroundColor = getMainColor(props)
  const activeBackgroundColor = getActiveMainColor(props)

  const textColor = getTextColor(props)
  const activeTextColor = getActiveTextColor(props)

  return {
    _className: process.env.NODE_ENV !== 'production' ? 'Button' : undefined,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: pxToRem(Spacing.ExtraSmall),
    paddingBottom: pxToRem(Spacing.ExtraSmall),

    paddingLeft: pxToRem(Spacing.Small),
    paddingRight: pxToRem(Spacing.Small),

    cursor: disabled ? 'default' : 'pointer',
    fontSize: pxToRem(FontSize.Medium),

    width: fill ? '100%' : undefined,
    borderRadius: pxToRem(Spacing.ExtraSmall),

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

export interface BaseButtonProps {
  readonly icon?: IconType
  readonly label: string
  readonly fill?: boolean
  readonly disabled?: boolean
  readonly color?: ButtonColor
  readonly variant?: ButtonVariant
  readonly outlined?: boolean
}

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
export type LinkButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

const ButtonWrapper = styled('button', ButtonStyle, themeMiddleware)
const LinkButtonWrapper = styled('a', ButtonStyle, themeMiddleware)

const ButtonIcon = styled('span', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ButtonIcon' : undefined,
  marginRight: pxToRem(Spacing.Tiny),
  marginLeft: pxToRem(-Spacing.Tiny)
}))

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {icon, label, fill, disabled, color = 'default', variant = 'default', ...props},
  ref
) {
  return (
    <ButtonWrapper
      ref={ref}
      styleProps={{fill, disabled, color, variant}}
      disabled={disabled}
      {...props}>
      {icon && (
        <ButtonIcon>
          <Icon element={icon} block />
        </ButtonIcon>
      )}
      {label}
    </ButtonWrapper>
  )
})

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function PrimaryLinkButton(
  {icon, label, fill, disabled, color = 'default', variant = 'default', ...props},
  ref
) {
  return (
    <LinkButtonWrapper
      ref={ref}
      styleProps={{fill, disabled, color, variant}}
      tabIndex={disabled ? -1 : undefined}
      {...props}>
      {icon && (
        <ButtonIcon>
          <Icon element={icon} block />
        </ButtonIcon>
      )}
      {label}
    </LinkButtonWrapper>
  )
})
