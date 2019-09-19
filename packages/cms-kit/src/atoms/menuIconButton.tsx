import React from 'react'
import {BaseButton, BaseButtonProps} from '../atoms/baseButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize, IconScale} from '../atoms/icon'
import {FontSize} from '../style/fontSize'
import {toArray} from '../utility'
import {TransitionDuration} from '../style/transition'
import {Spacing} from '../style/spacing'

export interface MenuIconButtonStyleProps {
  hideLabel: boolean
}

export const MenuIconButtonStyle = cssRuleWithTheme<{iconSize: IconSize}>(({theme}) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',

  padding: `${pxToRem(12)} ${pxToRem(18)}`,

  border: 'none',
  width: '100%',
  textAlign: 'left',
  fontSize: pxToRem(FontSize.Medium),

  fill: theme.colors.dark,

  '&:hover:enabled': {
    backgroundColor: theme.colors.grayLight,
    fill: theme.colors.dark
  },

  '&:active:enabled': {
    backgroundColor: theme.colors.white,
    fill: theme.colors.primary
  },

  '&:focus': {
    outline: 'none',
    fill: theme.colors.action
  }
}))

const LabelStyle = cssRuleWithTheme<MenuIconButtonStyleProps>(({hideLabel, theme}) => ({
  paddingLeft: pxToRem(Spacing.Tiny),
  whiteSpace: 'nowrap',
  opacity: hideLabel ? 0 : 1,
  transition: `opacity ${TransitionDuration.Fast}`
}))

export interface MenuIconButtonProps extends BaseButtonProps {
  readonly label?: string
  readonly icon: IconType
  readonly iconScale?: IconScale
  readonly hideLabel?: boolean
}

export function MenuIconButton({
  label,
  hideLabel = false,
  iconScale = IconScale.Larger,
  icon,
  href,
  onClick,
  style,
  styleProps
}: MenuIconButtonProps) {
  const {css} = useThemeStyle({hideLabel})

  return (
    <BaseButton
      href={href}
      onClick={onClick}
      style={[MenuIconButtonStyle, ...toArray(style)]}
      styleProps={styleProps}>
      <Icon type={icon} scale={iconScale} />
      <span className={css(LabelStyle)}>{label}</span>
    </BaseButton>
  )
}
