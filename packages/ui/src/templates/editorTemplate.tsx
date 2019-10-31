import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, ZIndex, Spacing} from '../style/helpers'

const contentMaxWidth = 1030

const EditorTemplateStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  minHeight: '100%'
}))

const EditorTemplateNavigationStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  position: 'sticky',
  top: 0,
  zIndex: ZIndex.NavigationBar,
  width: '100%'
}))

const EditorTemplateContentWrapperStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: pxToRem(Spacing.Large)
}))

const EditorTemplateContentStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  width: '100%',
  maxWidth: pxToRem(contentMaxWidth + Spacing.Large)
}))

export interface EditorTemplateProps {
  navigationChildren?: ReactNode
  children?: ReactNode
}

export function EditorTemplate({children, navigationChildren}: EditorTemplateProps) {
  const css = useThemeStyle()

  return (
    <div className={css(EditorTemplateStyle)}>
      <div className={css(EditorTemplateNavigationStyle)}>{navigationChildren}</div>
      <div className={css(EditorTemplateContentWrapperStyle)}>
        <div className={css(EditorTemplateContentStyle)}>{children}</div>
      </div>
    </div>
  )
}
