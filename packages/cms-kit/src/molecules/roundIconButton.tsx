import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon} from '../atoms/icon'

export const RoundIconButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  border: 'none',
  borderRadius: '100%',
  padding: pxToRem(8),

  '& path': {
    fill: theme.colors.action
  },
  '&:hover:enabled': {
    backgroundColor: theme.colors.light
  },
  '&:active': {
    backgroundImage: `linear-gradient(230deg, ${theme.colors.actionDark}, ${theme.colors.action})`
  },
  '&:disabled path': {
    fill: theme.colors.gray
  }
}))

export const RoundIconIconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(theme.iconSize.default)
}))

export interface RoundIconButtonProps extends ButtonProps {
  readonly icon: IconType
}

export function RoundIconButton({icon, href, onClick, ...rest}: RoundIconButtonProps) {
  const {css} = useThemeStyle()
  return (
    <Button href={href} onClick={onClick} className={css(RoundIconButtonStyle)} {...rest}>
      <Icon type={icon} className={css(RoundIconIconStyle)} />
    </Button>
  )
}
