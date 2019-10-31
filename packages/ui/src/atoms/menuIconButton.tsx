import React, {useContext} from 'react'
import {BaseButton, ButtonProps} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'

import {pxToRem, Spacing, TransitionDuration, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {NavigationContext} from '../organisms/navigation'

interface MenuIconButtonStyleProps {
  readonly isCollapsed: boolean
}

const MenuIconButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  alignItems: 'center',

  padding: `${pxToRem(12)} ${pxToRem(18)}`,

  width: '100%',
  fontSize: pxToRem(FontSize.Medium),
  textAlign: 'left',

  fill: theme.colors.dark,

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':hover:enabled': {
    backgroundColor: theme.colors.grayLight,
    fill: theme.colors.dark
  },

  ':active:enabled': {
    backgroundColor: theme.colors.white,
    fill: theme.colors.primaryDark
  }
}))

const LabelStyle = cssRuleWithTheme<MenuIconButtonStyleProps>(({isCollapsed}) => ({
  marginLeft: pxToRem(Spacing.ExtraSmall),
  whiteSpace: 'nowrap',
  opacity: isCollapsed ? 0 : 1,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

export interface MenuIconButtonProps extends ButtonProps {
  readonly label?: string
  readonly icon: IconType
  readonly iconScale?: IconScale
  readonly hideLabel?: boolean
}

export function MenuIconButton({
  label,
  iconScale = IconScale.Larger,
  icon,
  href,
  onClick
}: MenuIconButtonProps) {
  const {isCollapsed} = useContext(NavigationContext)
  const css = useThemeStyle({isCollapsed})

  return (
    <BaseButton href={href} onClick={onClick} style={MenuIconButtonStyle}>
      <Icon element={icon} scale={iconScale} block />
      <span className={css(LabelStyle)}>{label}</span>
    </BaseButton>
  )
}
