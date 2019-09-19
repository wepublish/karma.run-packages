import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/spacing'

export const contentMaxWidth = 880

const NavigationTemplateStyle = cssRuleWithTheme(() => ({
  display: 'flex',

  width: '100%',
  minHeight: '100%'
}))

const NavigationTemplateNavigationStyle = cssRuleWithTheme(() => ({
  position: 'sticky',
  top: 0,
  height: '100vh'
}))

const NavigationTemplateContentWrapperStyle = cssRuleWithTheme(() => ({
  display: 'flex',

  justifyContent: 'center',

  width: '100%',
  height: '100%'
}))

const NavigationTemplateContentStyle = cssRuleWithTheme(() => ({
  width: '100%',
  maxWidth: pxToRem(contentMaxWidth),
  padding: `${pxToRem(Spacing.ExtraLarge)} ${pxToRem(Spacing.Large)}`
}))

export interface NavigationTemplateProps {
  navigationChildren?: ReactNode
  children?: ReactNode
}

export function NavigationTemplate({children, navigationChildren}: NavigationTemplateProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(NavigationTemplateStyle)}>
      <div className={css(NavigationTemplateNavigationStyle)}>{navigationChildren}</div>
      <div className={css(NavigationTemplateContentWrapperStyle)}>
        <div className={css(NavigationTemplateContentStyle)}>{children}</div>
      </div>
    </div>
  )
}
