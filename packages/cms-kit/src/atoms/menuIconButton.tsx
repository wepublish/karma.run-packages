import React from 'react'
import {BaseButton, BaseButtonProps} from '../atoms/baseButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToEm, pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'
import {FontSize} from '../style/fontSizes'
import {toArray} from '../utility'

export const MenuIconButtonStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  display: 'block',
  border: 'none',
  width: '100%',
  textAlign: 'left',

  '& path': {
    fill: theme.colors.dark
  },
  '&:hover:enabled': {
    backgroundColor: theme.colors.grayLight
  },
  '&:hover:enabled path': {
    fill: theme.colors.dark
  },
  '&:active:enabled': {
    backgroundColor: theme.colors.white
  },
  '&:active:enabled path': {
    fill: theme.colors.primary
  }
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  fontSize: pxToEm(iconSize)
}))

const LabelStyle = cssRuleWithTheme<{show: boolean}>(({show, theme}) => ({
  verticalAlign: 'middle',
  paddingLeft: '5px',
  fontSize: show ? pxToEm(FontSize.Default) : 0,
  opacity: show ? 1 : 0,
  transition: '200ms'
}))

export interface MenuIconButtonProps extends BaseButtonProps {
  readonly icon: IconType
  readonly iconSize: IconSize
  readonly showTitle?: boolean
}

export function MenuIconButton({
  title,
  showTitle = true,
  icon,
  iconSize,
  href,
  onClick,
  style,
  styleProps
}: MenuIconButtonProps) {
  const {css} = useThemeStyle({show: showTitle, iconSize: iconSize})
  return (
    <BaseButton
      href={href}
      onClick={onClick}
      style={[MenuIconButtonStyle, ...toArray(style)]}
      styleProps={styleProps}>
      <>
        <Icon type={icon} style={IconStyle} styleProps={{iconSize: iconSize}} />
        <span className={css(LabelStyle)}>{title}</span>
      </>
    </BaseButton>
  )
}
