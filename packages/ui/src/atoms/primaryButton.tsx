import React, {ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes} from 'react'
import {styled, padding} from '@karma.run/react'

import {BaseButtonStyle} from './baseButton'
import {cssRuleWithTheme, themeMiddleware} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'

const PrimaryButtonStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PrimaryButton' : undefined,

  minWidth: pxToRem(140),

  borderRadius: pxToRem(Spacing.ExtraSmall),

  ...padding(pxToRem(Spacing.ExtraSmall)),

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

export interface PrimaryButtonProps {
  readonly label: string
}

export const PrimaryButton = styled(
  forwardRef<HTMLButtonElement, PrimaryButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
    ({label, ...props}, ref) => (
      <button {...props} ref={ref}>
        {label}
      </button>
    )
  ),
  (...props) => ({
    ...BaseButtonStyle(...props),
    ...PrimaryButtonStyle(...props)
  }),
  themeMiddleware
)

export const PrimaryLinkButton = styled(
  forwardRef<HTMLAnchorElement, PrimaryButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({label, ...props}, ref) => (
      <a {...props} ref={ref}>
        {label}
      </a>
    )
  ),
  (...props) => ({
    ...BaseButtonStyle(...props),
    ...PrimaryButtonStyle(...props)
  }),
  themeMiddleware
)
