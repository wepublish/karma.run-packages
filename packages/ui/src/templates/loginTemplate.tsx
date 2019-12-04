import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {Spacing, BorderRadius, ZIndex} from '../style/helpers'
import {cssRule} from '@karma.run/react'

const contentMaxWidth = 520

const LoginTemplateStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.light,

  width: '100%',
  height: '100%'
}))

const LoginTemplateContentStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
  zIndex: ZIndex.Default,

  width: '100%',
  maxWidth: contentMaxWidth + Spacing.Large,

  padding: Spacing.Large,

  backgroundColor: theme.colors.white,
  borderRadius: BorderRadius.Medium,

  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
}))

const LoginLogoStyle = cssRule(() => ({
  marginBottom: Spacing.Small,
  zIndex: ZIndex.Background
}))

export interface LoginTemplateProps {
  readonly children?: ReactNode
  readonly backgroundChildren?: ReactNode
}

export function LoginTemplate({backgroundChildren, children}: LoginTemplateProps) {
  const css = useThemeStyle()

  return (
    <div className={css(LoginTemplateStyle)}>
      {backgroundChildren && <div className={css(LoginLogoStyle)}>{backgroundChildren}</div>}
      <div className={css(LoginTemplateContentStyle)}>{children}</div>
    </div>
  )
}
