import React from 'react'

import {Editor as CoreEditor} from 'slate'
import {Editor, BasicEditorProps, Plugin, EditorProps} from 'slate-react'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {EditMenuButton, EditMenu} from '../blocks/editMenu'

const RichtextBlockStyle = cssRuleWithTheme(({theme}) => ({}))

export interface RichtextBlockProps extends BasicEditorProps {}

export function RichTextInput(props: RichtextBlockProps) {
  const css = useThemeStyle()

  return (
    <div className={css(RichtextBlockStyle)}>
      <Editor {...props} />
    </div>
  )
}

export function RichTextMenuPlugin(menuItems: EditMenuButton[]): Plugin {
  return {
    renderEditor(props: EditorProps, editor: CoreEditor, next: () => any) {
      return (
        <>
          {editor.value.selection.isFocused ? (
            <EditMenu>
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
          ) : null}
          {next()}
        </>
      )
    }
  }
}
