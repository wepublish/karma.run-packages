import React, {useContext, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import {IconElement, Icon, IconScale} from '../data/icon'

import {Spacing, TransitionDuration, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {NavigationContext} from '../navigation/navigation'

interface MenuButtonStyleProps {
  readonly isCollapsed: boolean
}

const MenuButtonStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'MenuButton' : undefined,

  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',

  padding: `12px 18px`,

  width: '100%',
  fontSize: FontSize.Medium,
  textAlign: 'left',

  fill: theme.colors.dark,
  color: theme.colors.dark,
  backgroundColor: 'transparent',
  border: 'none',

  transitionProperty: 'background-color, fill',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':hover:enabled': {
    backgroundColor: theme.colors.grayLight,
    fill: theme.colors.dark
  },

  ':active:enabled': {
    backgroundColor: theme.colors.white,
    fill: theme.colors.primaryDark
  },

  ':focus': {
    outline: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme<MenuButtonStyleProps>(({isCollapsed}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'MenuButtonLabel' : undefined,

  marginLeft: Spacing.ExtraSmall,
  whiteSpace: 'nowrap',
  opacity: isCollapsed ? 0 : 1,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

export interface BaseMenuButtonProps {
  readonly label?: string
  readonly icon: IconElement
  readonly iconScale?: IconScale
  readonly hideLabel?: boolean
}

export interface MenuButtonProps
  extends BaseMenuButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

// TODO: Forward ref
export function MenuButton({label, iconScale = IconScale.Larger, icon, ...props}: MenuButtonProps) {
  const {isCollapsed} = useContext(NavigationContext)
  const css = useThemeStyle({isCollapsed})

  return (
    <button className={css(MenuButtonStyle)} {...props}>
      <Icon element={icon} scale={iconScale} block />
      <span className={css(LabelStyle)}>{label}</span>
    </button>
  )
}

export interface MenuLinkButtonProps
  extends BaseMenuButtonProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {}

// TODO: Forward ref
export function MenuLinkButton({
  label,
  iconScale = IconScale.Larger,
  icon,
  ...props
}: MenuLinkButtonProps) {
  const {isCollapsed} = useContext(NavigationContext)
  const css = useThemeStyle({isCollapsed})

  return (
    <a className={css(MenuButtonStyle)} {...props}>
      <Icon element={icon} scale={iconScale} block />
      <span className={css(LabelStyle)}>{label}</span>
    </a>
  )
}
