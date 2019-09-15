import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize, BlockIcon} from '../atoms/icon'

export const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  border: 'none',

  '&:hover:enabled path': {
    fill: theme.colors.action
  },
  '&:active': {
    backgroundColor: theme.colors.light
  },
  '&:active path': {
    fill: theme.colors.action
  },
  '&:disabled': {
    color: theme.colors.gray
  },
  '&:disabled path': {
    fill: theme.colors.gray
  }
}))

export const IconLabelIconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Default)
}))

export interface IconLabelButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly label: string
}

export function IconLabelButton({label, icon, href, onClick, ...rest}: IconLabelButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(IconLabelButtonStyle)} {...rest}>
      <>
        <BlockIcon type={icon} className={css(IconLabelIconStyle)} />
        <div>{label}</div>
      </>
    </Button>
  )
}
