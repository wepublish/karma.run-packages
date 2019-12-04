import React from 'react'

import {IconElement, IconScale} from '../data/icon'
import {MenuButton} from '../buttons/menuButton'
import {NavigationButton} from '../buttons/navigationButton'

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

export interface MenuProps {
  readonly inline?: boolean
  readonly items: Array<MenuItem>

  onItemClick(item: MenuItem): void
}

export interface MenuItem {
  readonly id: string
  readonly icon: IconElement
  readonly label: string
}

export function Menu({items, inline, onItemClick}: MenuProps) {
  const css = useThemeStyle()
  let buttons = null

  if (inline) {
    buttons = items.map((item, index) => (
      <MenuButton
        key={index}
        title={item.label}
        icon={item.icon}
        iconScale={IconScale.Equal}
        label={item.label}
        onClick={() => onItemClick(item)}
      />
    ))
  } else {
    const numColumns = 3

    const rows = items.reduce<MenuItem[][]>((acc, child, index) => {
      const rowIndex = Math.floor(index / numColumns)
      const columnIndex = index % numColumns

      if (!acc[rowIndex]) {
        acc[rowIndex] = []
      }

      acc[rowIndex][columnIndex] = child

      return acc
    }, [])

    buttons = rows.map((columns, index) => (
      <div key={index}>
        {columns.map((item, index) => (
          <NavigationButton
            key={index}
            label={item.label}
            icon={item.icon}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    ))
  }

  return <div className={css(OverlayMenuStyle)}>{buttons}</div>
}
