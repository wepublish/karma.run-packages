import React from 'react'
import {EditMenuButton, EditMenu} from './editMenu'
import {Editor} from 'slate'

export interface RichtextEditorMenuProps {
  readonly editItems: EditMenuButton[]
  readonly editor: Editor
}

export function RichtextEditorMenu({editItems, editor}: RichtextEditorMenuProps) {
  return (
    <EditMenu>
      {editItems.map((item, idx) => (
        <EditMenuButton
          key={idx}
          editor={editor}
          isActive={item.isActive}
          icon={item.icon}
          onClick={item.onClick}
          label={item.label}
        />
      ))}
    </EditMenu>
  )
}
