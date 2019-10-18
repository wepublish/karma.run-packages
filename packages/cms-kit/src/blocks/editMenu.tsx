import React, {ReactNode} from 'react'

import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize} from '../style/helpers'
import {Spacing} from '../style/helpers'
import {Value, Editor} from 'slate'

export const DarkMenuStyle = cssRuleWithTheme(({theme}) => ({
  padding: pxToRem(Spacing.Tiny),
  borderRadius: '5px'
}))

export interface EditMenuProps {
  readonly children: ReactNode
}

export function EditMenu({children}: EditMenuProps) {
  const {css} = useThemeStyle()

  return <div className={css(DarkMenuStyle)}>{children}</div>
}

/**
 *
 * Rich Text Edit Button
 */
export const EditMenuButtonStyle = cssRuleWithTheme<{isActive: boolean}>(({isActive, theme}) => ({
  fill: isActive ? theme.colors.action : theme.colors.dark,
  fontSize: pxToRem(FontSize.Medium),
  paddingLeft: pxToRem(Spacing.Tiny / 2),
  paddingRight: pxToRem(Spacing.Tiny / 2),
  '&:hover': {
    backgroundColor: theme.colors.light
  }
}))

export interface EditMenuButton {
  readonly icon: IconType
  readonly label: string
  onClick(editor?: Editor, value?: Value, label?: string): void
  isActive(editor?: Editor, value?: Value, label?: string): boolean
}

export interface EditMenuButtonProps extends EditMenuButton {
  readonly editor?: Editor
}

export function EditMenuButton({editor, onClick, icon, label, isActive}: EditMenuButtonProps) {
  return (
    <BaseButton
      onClick={e => onClick(editor, editor ? editor.value : undefined, label)}
      style={EditMenuButtonStyle}
      styleProps={{isActive: isActive(editor, editor ? editor.value : undefined, label)}}>
      <Icon element={icon} scale={IconScale.Equal} />
    </BaseButton>
  )
}
