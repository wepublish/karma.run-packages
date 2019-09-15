import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'

export const OptionButtonStyle = cssRuleWithTheme(({theme}) => ({}))

const IconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Small)
}))

export interface OptionButtonProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButton({icon, href, onClick, ...rest}: OptionButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(OptionButtonStyle)} {...rest}>
      <Icon type={icon} className={css(IconStyle)} />
    </Button>
  )
}
