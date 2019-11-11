import React from 'react'

import {IconType, IconScale} from '../atoms/icon'
import {MenuIconButton} from '../atoms/menuIconButton'
import {NavigationButton} from '../input/buttons/navigationButton'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BorderRadius, BorderWidth} from '../style/helpers'

const OverlayMenuStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  borderStyle: 'solid',
  borderWidth: BorderWidth.Small,
  borderColor: theme.colors.grayLight,
  borderRadius: BorderRadius.Small,
  overflow: 'hidden'
}))

export interface OverlayMenuProps {
  readonly inline?: boolean
  readonly menuItems: Array<MenuItem>
  onMenuItemClick(item: MenuItem): void
}

export interface MenuItem {
  readonly id: string
  readonly icon: IconType
  readonly label: string
}

export function OverlayMenu({menuItems, inline, onMenuItemClick}: OverlayMenuProps) {
  const css = useThemeStyle()

  let MenuItems = <></>
  if (inline) {
    MenuItems = (
      <>
        {menuItems.map((item, index) => (
          <MenuIconButton
            key={index}
            title={item.label}
            icon={item.icon}
            iconScale={IconScale.Equal}
            label={item.label}
            onClick={() => onMenuItemClick(item)}
          />
        ))}
      </>
    )
  } else {
    const numColumns = 3

    const rows = menuItems.reduce<MenuItem[][]>((acc, child, index) => {
      const rowIndex = Math.floor(index / numColumns)
      const columnIndex = index % numColumns

      if (!acc[rowIndex]) {
        acc[rowIndex] = []
      }

      acc[rowIndex][columnIndex] = child

      return acc
    }, [])

    MenuItems = (
      <>
        {rows.map((columns, index) => (
          <div key={index}>
            {columns.map((item, index) => (
              <NavigationButton
                key={index}
                label={item.label}
                icon={item.icon}
                onClick={() => onMenuItemClick(item)}
              />
            ))}
          </div>
        ))}
      </>
    )
  }

  return <div className={css(OverlayMenuStyle)}>{MenuItems}</div>
}
