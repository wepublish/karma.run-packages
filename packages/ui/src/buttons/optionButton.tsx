import React, {useState, useRef} from 'react'

import {Menu, MenuItem} from '../navigation/menu'
import {useStyle, cssRule, useClickAwayListener} from '@karma.run/react'
import {Spacing, ZIndex} from '../style/helpers'
import {IconButton} from './iconButton'
import {MaterialIconMoreVert} from '@karma.run/icons'

const AddBlockInputStyle = cssRule(() => ({
  position: 'relative'
}))

interface MenuWrapperStyleProps {
  position: MenuPosition
}

const MenuWrapperStyle = cssRule<MenuWrapperStyleProps>(({position}) => ({
  position: 'absolute',
  zIndex: ZIndex.Tooltip,
  left: position === 'right' ? 0 : undefined,
  right: position === 'left' ? 0 : undefined,
  top: Spacing.Medium,
  marginBottom: Spacing.Large
}))

export type MenuPosition = 'left' | 'right'

export interface AddBlockInputProps {
  menuItems: Array<MenuItem>

  position?: MenuPosition
  disabled?: boolean

  onMenuItemClick(item: MenuItem): void
}

export function AddBlockInput({
  menuItems,
  position = 'right',
  disabled,
  onMenuItemClick
}: AddBlockInputProps) {
  const css = useStyle({position})

  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  useClickAwayListener(ref, () => {
    setOpen(false)
  })

  return (
    <div className={css(AddBlockInputStyle)}>
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
