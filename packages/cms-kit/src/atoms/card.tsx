import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {Spacing} from '../style/spacing'
import {pxToRem} from '../style/helpers'

export const CardStyle = cssRuleWithTheme(({theme}) => ({
  border: `solid 1px ${theme.colors.grayLight}`,
  borderRadius: pxToRem(8),
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
