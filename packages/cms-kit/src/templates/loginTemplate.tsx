import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'

const contentMaxWidth = 520

const LoginTemplateStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%'
}))

const LoginTemplateContentStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  width: '100%',
  maxWidth: pxToRem(contentMaxWidth + Spacing.Large),
  padding: pxToRem(Spacing.Large),

  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  borderRadius: pxToRem(10),
  overflow: 'hidden'
}))

export interface LoginTemplateProps {
  children?: ReactNode
}

export function LoginTemplate({children}: LoginTemplateProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(LoginTemplateStyle)}>
      <div className={css(LoginTemplateContentStyle)}>{children}</div>
    </div>
  )
}
