import React, {useState} from 'react'

import {OverlayMenu, MenuItem} from '../molecules/overlayMenu'
import {AddBlockButton} from '../molecules/addBlockButton'
import {useStyle, cssRule} from '@karma.run/react'

const AddBlockMenuStyle = cssRule(() => ({
  position: 'relative'
}))

const AddButtonOverlayMenuStyle = cssRule(() => ({
  position: 'absolute'
}))

export interface AddBlockMenuProps {
  readonly menuItems: Array<MenuItem>
  onMenuItemClick(item: MenuItem): void
}

export function AddBlockMenu({menuItems, onMenuItemClick}: AddBlockMenuProps) {
  const [isOpen, setOpen] = useState(false)
  const {css} = useStyle()

  return (
    <div className={css(AddBlockMenuStyle)}>
      <AddBlockButton onClick={() => setOpen(!isOpen)} active={isOpen} />

      {isOpen && (
        <div className={css(AddButtonOverlayMenuStyle)}>
          <OverlayMenu menuItems={menuItems} onMenuItemClick={onMenuItemClick} />
        </div>
      )}
    </div>
  )
}
