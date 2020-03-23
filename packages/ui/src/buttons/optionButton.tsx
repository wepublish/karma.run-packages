import React, {useState, useRef} from 'react'
import {useStyle, cssRule, useClickAwayListener} from '@karma.run/react'
import {MaterialIconMoreVert} from '@karma.run/icons'

import {IconButton} from './iconButton'
import {Menu, MenuItem} from '../navigation/menu'
import {Spacing, ZIndex} from '../style/helpers'

const OptionButtonStyle = cssRule(() => ({
  _className: process.env.NODE_ENV !== 'production' ? 'OptionButton' : undefined,
  position: 'relative'
}))

interface MenuWrapperStyleProps {
  position: MenuPosition
}

const MenuWrapperStyle = cssRule<MenuWrapperStyleProps>(({position}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'MenuWrapper' : undefined,

  position: 'absolute',
  zIndex: ZIndex.Tooltip,
  left: position === 'right' ? 0 : undefined,
  right: position === 'left' ? 0 : undefined,
  top: Spacing.Medium,
  marginBottom: Spacing.Large
}))

export type MenuPosition = 'left' | 'right'

export interface OptionButtonProps {
  menuItems: Array<MenuItem>

  position?: MenuPosition
  disabled?: boolean

  onMenuItemClick(item: MenuItem): void
}

export function OptionButton({
  menuItems,
  position = 'right',
  disabled,
  onMenuItemClick
}: OptionButtonProps) {
  const css = useStyle({position})

  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  useClickAwayListener(ref, () => {
    setOpen(false)
  })

  return (
    <div className={css(OptionButtonStyle)}>
      <IconButton
        onClick={() => setOpen(!isOpen)}
        active={isOpen}
        icon={MaterialIconMoreVert}
        disabled={disabled}
      />

      {isOpen && (
        <div ref={ref} className={css(MenuWrapperStyle)}>
          <Menu
            inline
            items={menuItems}
            onItemClick={item => {
              setOpen(false)
              onMenuItemClick(item)
            }}
          />
        </div>
      )}
    </div>
  )
}
