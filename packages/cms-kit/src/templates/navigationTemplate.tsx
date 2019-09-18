import React, {useState, ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/spacing'

export const navigationWidth = 280
export const navigationCollapsedWidth = 60
export const contentMaxWidth = 880

export interface NavigationTemplateStyleProps {
  isNavigationCollapsed: boolean
}

export const NavigationTemplateStyle = cssRuleWithTheme(() => ({
  display: 'flex',

  width: '100%',
  minHeight: '100%'
}))

export const NavigationTemplateMenuStyle = cssRuleWithTheme<NavigationTemplateStyleProps>(
  ({isNavigationCollapsed}) => ({
    width: isNavigationCollapsed ? pxToRem(navigationCollapsedWidth) : pxToRem(navigationWidth),
    transition: 'width 200ms'
  })
)

export const NavigationTemplateContentWrapperStyle = cssRuleWithTheme(() => ({
  display: 'flex',

  justifyContent: 'center',

  width: '100%',
  height: '100%'
}))

export const NavigationTemplateContentStyle = cssRuleWithTheme(() => ({
  width: '100%',
  maxWidth: pxToRem(contentMaxWidth),
  padding: `${pxToRem(Spacing.ExtraLarge)} ${pxToRem(Spacing.Large)}`
}))

export interface NavigationTemplateProps {
  navigationChildren?: ReactNode
  children?: ReactNode
}

export function NavigationTemplate({children}: NavigationTemplateProps) {
  const [isNavigationCollapsed, setNavigationCollapsed] = useState(false)
  const {css} = useThemeStyle<NavigationTemplateStyleProps>({isNavigationCollapsed})

  return (
    <div className={css(NavigationTemplateStyle)}>
      <div className={css(NavigationTemplateMenuStyle)}></div>
      <div className={css(NavigationTemplateContentWrapperStyle)}>
        <div className={css(NavigationTemplateContentStyle)}>{children}</div>
      </div>
    </div>
  )
}
