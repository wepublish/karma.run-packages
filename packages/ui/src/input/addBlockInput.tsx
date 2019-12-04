import React, {useState, useRef} from 'react'

import {Menu, MenuItem} from '../navigation/menu'
import {AddBlockButton} from '../buttons/addBlockButton'
import {useStyle, cssRule, useClickAwayListener} from '@karma.run/react'
import {Spacing, ZIndex} from '../style/helpers'

const AddBlockInputStyle = cssRule(() => ({
  position: 'relative'
}))

const MenuWrapperStyle = cssRule(() => ({
  position: 'absolute',
  zIndex: ZIndex.Tooltip,
  left: '50%',
  top: Spacing.Medium,
  transform: 'translateX(-50%)',
  marginBottom: Spacing.Large
}))

export interface AddBlockInputProps {
  readonly menuItems: Array<MenuItem>
  readonly subtle?: boolean

  onMenuItemClick(item: MenuItem): void
}

export function AddBlockInput({menuItems, subtle, onMenuItemClick}: AddBlockInputProps) {
  const css = useStyle()

  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  useClickAwayListener(ref, () => {
    setOpen(false)
  })

  return (
    <div className={css(AddBlockInputStyle)}>
      <AddBlockButton onClick={() => setOpen(!isOpen)} active={isOpen} subtle={subtle} />

      {isOpen && (
        <div ref={ref} className={css(MenuWrapperStyle)}>
          <Menu
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
