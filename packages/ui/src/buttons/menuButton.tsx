import React, {useContext, ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef} from 'react'
import {IconElement, Icon, IconScale} from '../data/icon'

import {
  Spacing,
  TransitionDuration,
  FontSize,
  MarginProps,
  extractStyleProps
} from '../style/helpers'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {NavigationContext} from '../navigation/navigation'

interface MenuButtonStyleProps extends MarginProps {
  disabled?: boolean
  active?: boolean
  isCollapsed: boolean
}

const MenuButtonStyle = cssRuleWithTheme<MenuButtonStyleProps>(
  ({theme, isCollapsed, disabled, active, ...props}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'MenuButton' : undefined,

    cursor: 'pointer',
    pointerEvents: disabled ? 'none' : undefined,
    userSelect: 'none',

    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',

    padding: `12px 18px`,

    width: '100%',
    fontSize: FontSize.Medium,
    textAlign: 'left',

    fill: active ? theme.colors.primaryDark : theme.colors.dark,
    color: theme.colors.dark,
    backgroundColor: active ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
    border: 'none',

    transitionProperty: 'background-color, fill',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Fast,

    opacity: disabled ? 0.5 : undefined,

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.025)',
      fill: theme.colors.dark
    },

    ':active': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fill: theme.colors.primaryDark
    },

    ':focus': {
      outline: 'none'
    },

    ...props
  })
)

const LabelStyle = cssRuleWithTheme<MenuButtonStyleProps>(({isCollapsed}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'MenuButtonLabel' : undefined,

  marginLeft: Spacing.ExtraSmall,
  whiteSpace: 'nowrap',
  opacity: isCollapsed ? 0 : 1,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

export interface BaseMenuButtonProps extends MarginProps {
  label?: string
  icon: IconElement
  iconScale?: IconScale
  hideLabel?: boolean
  disabled?: boolean
  active?: boolean
}

export interface MenuButtonProps
  extends BaseMenuButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  {label, iconScale = IconScale.Larger, icon, disabled, active, ...props},
  ref
) {
  const [layoutProps, elementProps] = extractStyleProps(props)

  const {isCollapsed} = useContext(NavigationContext)
  const css = useThemeStyle({isCollapsed, disabled, active, ...layoutProps})

  return (
    <button {...elementProps} ref={ref} className={css(MenuButtonStyle)}>
      <Icon element={icon} scale={iconScale} block />
      <span className={css(LabelStyle)}>{label}</span>
    </button>
  )
})

export interface MenuLinkButtonProps
  extends BaseMenuButtonProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {}

export const MenuLinkButton = forwardRef<HTMLAnchorElement, MenuLinkButtonProps>(
  function MenuLinkButton(
    {label, iconScale = IconScale.Larger, icon, disabled, active, ...props},
    ref
  ) {
    const [layoutProps, elementProps] = extractStyleProps(props)

    const {isCollapsed} = useContext(NavigationContext)
    const css = useThemeStyle({isCollapsed, disabled, active, ...layoutProps})

    return (
      <a
        {...elementProps}
        ref={ref}
        className={css(MenuButtonStyle)}
        tabIndex={disabled ? -1 : elementProps.tabIndex}>
        <Icon element={icon} scale={iconScale} block />
        <span className={css(LabelStyle)}>{label}</span>
      </a>
    )
  }
)
