import React, {forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'

import {pxToRem, Spacing, TransitionDuration, FontSize, hexToRgba} from '../style/helpers'
import {cssRuleWithTheme, themeMiddleware} from '../style/themeContext'
import {BaseButtonStyle} from './baseButton'
import {Icon, IconScale, IconType} from './icon'
import {styled} from '@karma.run/react'
import {Box} from '../layout/box'

const IconButtonStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'IconButton' : undefined,

  minWidth: pxToRem(70),
  height: pxToRem(60),

  fontSize: pxToRem(FontSize.Small),

  paddingLeft: pxToRem(Spacing.Tiny),
  paddingRight: pxToRem(Spacing.Tiny),

  transitionProperty: 'fill, background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    fill: theme.colors.action
  },

  '&:active:enabled': {
    fill: theme.colors.actionDark,
    backgroundColor: hexToRgba(theme.colors.dark, 0.05)
  },

  '&:disabled': {
    fill: theme.colors.gray,
    color: theme.colors.gray
  }
}))

export interface IconButtonProps {
  readonly icon: IconType
  readonly label: string
}

export const IconButton = styled(
  forwardRef<HTMLButtonElement, IconButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
    ({icon, label, ...props}, ref) => (
      <button {...props} ref={ref}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" block>
          {label}
        </Box>
      </button>
    )
  ),
  (...props) => ({
    ...BaseButtonStyle(...props),
    ...IconButtonStyle(...props)
  }),
  themeMiddleware
)

export const IconLinkButton = styled(
  forwardRef<HTMLAnchorElement, IconButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>>(
    ({icon, label, ...props}, ref) => (
      <a {...props} ref={ref}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" block>
          {label}
        </Box>
      </a>
    )
  ),
  (...props) => ({
    ...BaseButtonStyle(...props),
    ...IconButtonStyle(...props)
  }),
  themeMiddleware
)
