import React from 'react'
import {BaseButton, BaseButtonProps} from '../atoms/baseButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, Spacing, TransitionDuration} from '../style/helpers'
import {IconType, Icon, IconScale} from '../atoms/icon'
import {toArray} from '../utility'
import {FontMedium, Align, FontInlineMedium} from '../style/textStyles'

interface MenuIconButtonStyleProps {
  readonly hideLabel: boolean
}

const MenuIconButtonStyle = cssRuleWithTheme<MenuIconButtonStyleProps>(({theme}) => ({
  padding: `${pxToRem(12)} ${pxToRem(18)}`,

  border: 'none',
  width: '100%',
  textAlign: 'left',

  fill: theme.colors.dark,

  transition: 'background-color ease-in',
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

const LabelStyle = cssRuleWithTheme<MenuIconButtonStyleProps>(({hideLabel, theme}) => ({
  marginLeft: pxToRem(Spacing.ExtraSmall),
  whiteSpace: 'nowrap',
  opacity: hideLabel ? 0 : 1,
  transition: 'opacity',
  transitionDuration: TransitionDuration.Fast
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
      <FontInlineMedium>
        <Icon type={icon} scale={iconScale} />
        <span className={css(LabelStyle)}>{label}</span>
      </FontInlineMedium>
    </BaseButton>
  )
}
