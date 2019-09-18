import React from 'react'

import {IconType, IconSize} from '../atoms/icon'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {MenuIconButton} from '../atoms/menuIconButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

const OverlayMenuStyle = cssRuleWithTheme(({theme}) => ({
  padding: '10px',
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  borderRadius: pxToRem(10)
}))

export interface OverlayMenuProps {
  inline?: boolean
  menuItems: Array<MenuItem>
}

export interface MenuItem {
  id: string
  icon: IconType
  label: string
  onClick(id: string): void
}

export function OverlayMenu({menuItems, inline}: OverlayMenuProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(OverlayMenuStyle)}>
      {menuItems.map((item, index) =>
        inline ? (
          <MenuIconButton
            key={index}
            title={item.label}
            icon={item.icon}
            iconSize={IconSize.Small}
          />
        ) : (
          <IconLabelButton key={index} label={item.label} icon={item.icon} />
        )
      )}
    </div>
  )
}
