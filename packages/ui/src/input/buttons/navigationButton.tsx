import React, {forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'

import {pxToRem, Spacing, TransitionDuration, FontSize} from '../../style/helpers'
import {cssRuleWithTheme, themeMiddleware, Theme} from '../../style/themeContext'
import {Icon, IconScale, IconType} from '../../atoms/icon'
import {styled} from '@karma.run/react'
import {Box} from '../../layout/box'

interface NavigationButtonStyleProps {
  readonly disabled?: boolean
  readonly theme: Theme
}

const NavigationButtonStyle = cssRuleWithTheme<NavigationButtonStyleProps>(({disabled, theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'NavigationButton' : undefined,

  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: pxToRem(70),
  height: pxToRem(60),

  cursor: 'pointer',
  fontSize: pxToRem(FontSize.Small),
  fontFamily: 'inherit',

  paddingLeft: pxToRem(Spacing.ExtraSmall),
  paddingRight: pxToRem(Spacing.ExtraSmall),

  fill: disabled ? theme.colors.gray : theme.colors.dark,
  color: disabled ? theme.colors.gray : theme.colors.dark,
  pointerEvents: disabled ? 'none' : undefined,

  borderWidth: 0,
  borderRadius: 0,
  borderStyle: 'none',
  backgroundColor: 'transparent',

  transitionProperty: 'fill background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':link': {
    fill: disabled ? theme.colors.gray : theme.colors.dark,
    color: disabled ? theme.colors.gray : theme.colors.dark
  },

  ':visited': {
    fill: disabled ? theme.colors.gray : theme.colors.dark,
    color: disabled ? theme.colors.gray : theme.colors.dark
  },

  ':hover': {
    fill: theme.colors.action,
    backgroundColor: 'rgba(0, 0, 0, 0.025)'
  },

  ':active': {
    fill: theme.colors.actionDark,
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },

  ':focus': {
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.025)'
  }
}))

export interface BaseNavigationButtonProps {
  readonly icon: IconType
  readonly label: string
  readonly disabled?: boolean
}

export type NavigationButtonProps = BaseNavigationButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export type NavigationLinkButtonProps = BaseNavigationButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

const NavigationButtonWrapper = styled('button', NavigationButtonStyle, themeMiddleware)
const NavigationLinkButtonWrapper = styled('a', NavigationButtonStyle, themeMiddleware)

export const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  function NavigationButton({label, icon, disabled, ...props}, ref) {
    return (
      <NavigationButtonWrapper ref={ref} styleProps={{disabled}} {...props}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" block>
          {label}
        </Box>
      </NavigationButtonWrapper>
    )
  }
)

export const NavigationLinkButton = forwardRef<HTMLAnchorElement, NavigationLinkButtonProps>(
  function NavigationLinkButton({label, icon, disabled, ...props}, ref) {
    return (
      <NavigationLinkButtonWrapper ref={ref} styleProps={{disabled}} {...props}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" block>
          {label}
        </Box>
      </NavigationLinkButtonWrapper>
    )
  }
)
