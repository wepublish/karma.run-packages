import React, {ReactNode} from 'react'

import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'

const CardStyle = cssRuleWithTheme(({theme}) => ({
  border: `solid 1px ${theme.colors.grayLight}`,
  borderRadius: pxToRem(8),
  backgroundColor: theme.colors.white,
  padding: pxToRem(Spacing.ExtraSmall),
  width: '100%'
}))

export interface CardProps {
  children?: ReactNode
}

export function Card({children}: CardProps) {
  const {css} = useThemeStyle()
  return <div className={css(CardStyle)}>{children}</div>
}
