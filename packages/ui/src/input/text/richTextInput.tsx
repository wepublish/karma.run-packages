import React from 'react'

import {Editor as CoreEditor} from 'slate'
import {Editor, BasicEditorProps, Plugin, EditorProps} from 'slate-react'

import {EditMenuButton, EditMenu} from '../../blocks/editMenu'
import {useStyle, cssRule} from '@karma.run/react'

const RichTextInputStyle = cssRule(() => ({
  width: '100%',
  minHeight: '100%'
}))

export interface RichtextBlockProps extends BasicEditorProps {}

export function RichTextInput(props: RichtextBlockProps) {
  const css = useStyle()

  return <Editor {...props} className={css(RichTextInputStyle)} />
}

export function RichTextMenuPlugin(menuItems: EditMenuButton[]): Plugin {
  return {
    renderEditor(props: EditorProps, editor: CoreEditor, next: () => any) {
      return (
        <>
          <EditMenu>
            {/* TODO: Change opacitiy on focus: editor.value.selection.isFocused */}
            {menuItems.map((item, idx) => (
              <EditMenuButton
                key={idx}
                editor={editor}
                isActive={item.isActive}
                icon={item.icon}
                onApply={item.onApply}
                label={item.label}
              />
            ))}
          </EditMenu>
          {next()}
        </>
      )
    }
  }
}
