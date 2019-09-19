import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {IconType} from '../atoms/icon'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/spacing'

export const contentMaxWidth = 1030

export const EditorTemplateStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  minHeight: '100%'
}))

export const EditorTemplateNavigationStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  position: 'sticky',
  top: 0,

  width: '100%'
}))

export const EditorTemplateContentWrapperStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}))

export const EditorTemplateContentStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  width: '100%',
  maxWidth: pxToRem(contentMaxWidth + Spacing.Large),
  padding: pxToRem(Spacing.Large)
}))

export interface EditorTemplateProps {
  navigationChildren?: ReactNode
  children?: ReactNode
}

export function EditorTemplate({children, navigationChildren}: EditorTemplateProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(EditorTemplateStyle)}>
      <div className={css(EditorTemplateNavigationStyle)}>{navigationChildren}</div>
      <div className={css(EditorTemplateContentWrapperStyle)}>
        <div className={css(EditorTemplateContentStyle)}>{children}</div>
      </div>
    </div>
  )
}
