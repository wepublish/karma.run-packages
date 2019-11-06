import React, {forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {styled, padding, cssRule} from '@karma.run/react'

import {ButtonResetStyle} from './baseButton'
import {themeMiddleware, Theme} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'

interface PrimaryButtonStyleProps {
  readonly fill?: boolean
  readonly theme: Theme
}

const PrimaryButtonStyle = cssRule<PrimaryButtonStyleProps>(({fill, theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PrimaryButton' : undefined,

  ...ButtonResetStyle,
  ...padding(pxToRem(Spacing.ExtraSmall)),

  width: fill ? '100%' : undefined,
  minWidth: pxToRem(140),
  borderRadius: pxToRem(Spacing.ExtraSmall),

  color: theme.colors.white,
  backgroundColor: theme.colors.primary,

  fontSize: pxToRem(FontSize.Medium),
  fontWeight: 'bold',
  textAlign: 'center',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':link': {
    color: theme.colors.white
  },

  ':visited': {
    color: theme.colors.white
  },

  ':hover:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.grayLight
  },

  ':disabled': {
    backgroundColor: theme.colors.grayLight,
    color: theme.colors.gray
  }
}))

export interface BasePrimaryButtonProps {
  readonly label: string
  readonly fill?: boolean
}

export type PrimaryButtonProps = BasePrimaryButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
export type PrimaryLinkButtonProps = BasePrimaryButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const PrimaryButtonContainer = styled('button', PrimaryButtonStyle, themeMiddleware)
export const PrimaryLinkButtonContainer = styled('a', PrimaryButtonStyle, themeMiddleware)

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton({label, fill, ...props}, ref) {
    return (
      <PrimaryButtonContainer ref={ref} styleProps={{fill}} {...props}>
        {label}
      </PrimaryButtonContainer>
    )
  }
)

export const PrimaryLinkButton = forwardRef<HTMLAnchorElement, PrimaryLinkButtonProps>(
  function PrimaryLinkButton({label, fill, ...props}, ref) {
    return (
      <PrimaryLinkButtonContainer ref={ref} styleProps={{fill}} {...props}>
        {label}
      </PrimaryLinkButtonContainer>
    )
  }
)
