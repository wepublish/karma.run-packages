import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'

export const OptionButtonShadowStyle = cssRuleWithTheme(({theme}) => ({}))

const IconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Small)
}))

export interface OptionButtonShadowProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButtonShadow({icon, href, onClick, ...rest}: OptionButtonShadowProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(OptionButtonShadowStyle)} {...rest}>
      <Icon type={icon} className={css(IconStyle)} />
    </Button>
  )
}
