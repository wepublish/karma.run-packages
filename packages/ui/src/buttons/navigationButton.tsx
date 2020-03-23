import React, {forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import {styled} from '@karma.run/react'

import {
  Spacing,
  TransitionDuration,
  FontSize,
  MarginProps,
  extractStyleProps
} from '../style/helpers'

import {cssRuleWithTheme, themeMiddleware, Theme} from '../style/themeContext'
import {Icon, IconScale, IconElement} from '../data/icon'
import {Box} from '../layout/box'

interface NavigationButtonStyleProps extends MarginProps {
  disabled?: boolean
  active?: boolean
  theme: Theme
}

const NavigationButtonStyle = cssRuleWithTheme<NavigationButtonStyleProps>(
  ({disabled, active, theme, ...props}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'NavigationButton' : undefined,

    cursor: 'pointer',
    pointerEvents: disabled ? 'none' : undefined,
    userSelect: 'none',

    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    minWidth: 70,
    height: 60,

    fontSize: FontSize.Small,
    fontFamily: 'inherit',

    paddingLeft: Spacing.ExtraSmall,
    paddingRight: Spacing.ExtraSmall,

    fill: disabled ? theme.colors.gray : active ? theme.colors.action : theme.colors.dark,
    color: disabled ? theme.colors.gray : theme.colors.dark,

    borderWidth: 0,
    borderRadius: 0,
    borderStyle: 'none',
    backgroundColor: active ? 'rgba(0, 0, 0, 0.05)' : 'transparent',

    transitionProperty: 'fill, background-color',
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
    },

    ...props
  })
)

const NavigationButtonWrapper = styled('button', NavigationButtonStyle, themeMiddleware)
const NavigationLinkButtonWrapper = styled('a', NavigationButtonStyle, themeMiddleware)

export interface BaseNavigationButtonProps extends MarginProps {
  icon: IconElement
  label: string
  disabled?: boolean
  active?: boolean
}

export type NavigationButtonProps = BaseNavigationButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  function NavigationButton({label, icon, disabled, active, ...props}, ref) {
    const [layoutProps, elementProps] = extractStyleProps(props)

    return (
      <NavigationButtonWrapper
        {...elementProps}
        ref={ref}
        styleProps={{disabled, active, ...layoutProps}}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" display="block">
          {label}
        </Box>
      </NavigationButtonWrapper>
    )
  }
)

export type NavigationLinkButtonProps = BaseNavigationButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const NavigationLinkButton = forwardRef<HTMLAnchorElement, NavigationLinkButtonProps>(
  function NavigationLinkButton({label, icon, disabled, active, ...props}, ref) {
    const [layoutProps, elementProps] = extractStyleProps(props)

    return (
      <NavigationLinkButtonWrapper
        {...elementProps}
        ref={ref}
        styleProps={{disabled, active, ...layoutProps}}
        tabIndex={disabled ? -1 : elementProps.tabIndex}>
        <Icon element={icon} scale={IconScale.Double} />
        <Box element="span" display="block">
          {label}
        </Box>
      </NavigationLinkButtonWrapper>
    )
  }
)
