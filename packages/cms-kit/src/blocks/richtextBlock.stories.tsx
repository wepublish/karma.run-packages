import React, {useState} from 'react'
import {Value, DocumentJSON, ValueJSON, Editor as CoreEditor, Block} from 'slate'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {RichtextBlock} from './richtextBlock'
import {IconType} from '../atoms/icon'
import {RenderMarkProps, RenderBlockProps} from 'slate-react'
import {RichtextEditorMenu} from './richtextEditorMenu'
import {
  MaterialIconFormatBold,
  MaterialIconFormatItalic,
  MaterialIconFormatUnderlined,
  MaterialIconFormatStrikethrough,
  MaterialIconLooksTwoOutlined,
  MaterialIconLooks3Outlined,
  MaterialIconFormatListBulleted,
  MaterialIconFormatListNumbered,
  MaterialIconLink
} from '@karma.run/icons'

export default {
  component: RichtextBlock,
  title: 'Blocks|RichtextBlock',
  decorators: [centerLayoutDecorator(0.8)]
}

enum RichtextType {
  H2 = 'heading-two',
  H3 = 'heading-three',
  Link = 'link',
  BulletList = 'bulleted-list',
  NumberedList = 'numbered-list',
  ListItem = 'list-item',
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underlined',
  Strike = 'striked'
}

export const Standard = () => {
  const val: ValueJSON = {object: 'value', document: {...mockRichTextValue}}
  const [stateValue, setStateValue] = useState(Value.create(val))

  const DEFAULT_NODE = 'paragraph'

  function onChange(val: Value) {
    setStateValue(val)
  }

  function renderMark(props: RenderMarkProps, editor: CoreEditor, next: () => any) {
    const {children, mark, attributes} = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  function renderBlock(props: RenderBlockProps, editor: CoreEditor, next: () => any) {
    const {children, node, attributes} = props

    switch (node.type) {
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'link':
        return <a {...attributes}>{children}</a>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      default:
        return next()
    }
  }

  function hasMark(editor: CoreEditor, value: Value, label: string) {
    return value.activeMarks.some(mark => mark.type === label)
  }

  function hasType(editor: CoreEditor, value: Value, label: string) {
    return hasBlock(value, label)
  }

  function hasBlock(value: Value, label: string) {
    return value.blocks.some(block => {
      return block.type === label
    })
  }

  function hasInlines(editor: CoreEditor, value: Value, label: string) {
    return value.inlines.some(inline => inline.type === label)
  }

  function isListOfType(editor: CoreEditor, val: Value, label: string) {
    const {blocks} = val
    const first = blocks.first()
    const isListItem = blocks.some(blocks => blocks.type === 'list-item')

    return editor.value.blocks.some(block => {
      if (isListItem) {
        const parent = val.document.getClosest(
          first.key,
          parent => parent.object == 'block' && parent.type == label
        )

        return parent != undefined
      }
    })
  }

  function toggleMark(editor: CoreEditor, value: Value, label: string) {
    editor.toggleMark(label)
    setStateValue(editor.value)
  }

  function toggleTitle(editor: CoreEditor, value: Value, isH2: boolean) {
    const type = isH2 ? RichtextType.H2 : RichtextType.H3
    const isActive = hasBlock(value, type)
    const isList = hasBlock(value, 'list-item')

    if (isList) {
      editor
        .setBlocks(isActive ? DEFAULT_NODE : type)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else {
      console.log('set block ', isActive ? DEFAULT_NODE : type)
      editor.setBlocks(isActive ? DEFAULT_NODE : type)
    }
    setStateValue(editor.value)
  }

  function toggleList(editor: CoreEditor, value: Value, listType: string) {
    // Handle the extra wrapping required for list buttons.
    const isList = hasBlock(value, RichtextType.ListItem)
    const isType = value.blocks.some(block => {
      return !!value.document.getClosest(
        block.key,
        parent => parent.object == 'block' && parent.type === listType
      )
    })

    if (isList && isType) {
      editor
        .setBlocks(DEFAULT_NODE)
        .unwrapBlock(RichtextType.BulletList)
        .unwrapBlock(RichtextType.NumberedList)
    } else if (isList) {
      editor
        .unwrapBlock(
          listType === RichtextType.BulletList ? RichtextType.NumberedList : RichtextType.BulletList
        )
        .wrapBlock(listType)
    } else {
      editor.setBlocks(RichtextType.ListItem).wrapBlock(listType)
    }
    setStateValue(editor.value)
  }

  const standardRichTextEditItems = [
    {
      icon: MaterialIconFormatBold,
      label: 'bold',
      onClick: toggleMark,
      isActive: hasMark
    },
    {
      icon: MaterialIconFormatItalic,
      label: 'italic',
      onClick: toggleMark,
      isActive: hasMark
    },
    {
      icon: MaterialIconFormatUnderlined,
      label: 'underline',
      onClick: toggleMark,
      isActive: hasMark
    },
    {
      icon: MaterialIconFormatStrikethrough,
      label: 'striked',
      onClick: toggleMark,
      isActive: hasMark
    },
    {
      icon: MaterialIconLooksTwoOutlined,
      label: 'heading-two',
      onClick: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, true),
      isActive: hasType
    },
    {
      icon: MaterialIconLooks3Outlined,
      label: 'heading-three',
      onClick: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, false),
      isActive: hasType
    },
    {
      icon: MaterialIconFormatListBulleted,
      label: 'bulleted-list',
      onClick: (editor: CoreEditor, value: Value) =>
        toggleList(editor, value, RichtextType.BulletList),
      isActive: isListOfType
    },
    {
      icon: MaterialIconFormatListNumbered,
      label: 'numbered-list',
      onClick: (editor: CoreEditor, value: Value) =>
        toggleList(editor, value, RichtextType.NumberedList),
      isActive: isListOfType
    },
    {
      icon: MaterialIconLink,
      label: 'link',
      onClick: (editor: CoreEditor, value: Value) => {}, // todo open side panel to enter href
      isActive: hasInlines
    }
  ]

  function renderMenu(props, editor, next) {
    const children = next()
    return (
      <>
        <RichtextEditorMenu editor={editor} editItems={standardRichTextEditItems} />
        {children}
      </>
    )
  }

  return (
    <RichtextBlock
      showMenu={true}
      renderMenu={renderMenu}
      value={stateValue}
      onChange={onChange}
      renderMark={renderMark}
      renderBlock={renderBlock}
    />
  )
}

const mockRichTextValue: DocumentJSON = {
  object: 'document',
  nodes: [
    {
      object: 'block',
      key: '90',
      type: 'heading-two',
      nodes: [
        {
          object: 'text',
          key: '10',
          text: 'This is a H2 '
        }
      ]
    },
    {
      object: 'block',
      key: '1',
      type: 'heading-three',
      nodes: [
        {
          object: 'text',
          key: '11',
          text: 'This is a H3'
        }
      ]
    },
    {
      object: 'block',
      key: '2',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          key: '12',
          text: "Since it's rich text, you can do things like turn a selection of text "
        },
        {
          object: 'text',
          key: '91',
          text: 'bold',
          marks: [{type: 'bold'}]
        },
        {
          object: 'text',
          key: '32',
          text: ', or '
        },
        {
          object: 'text',
          key: '3',
          text: 'italic',
          marks: [{type: 'italic'}]
        },
        {
          object: 'text',
          key: '4',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      key: '43',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          key: '13',
          text: 'In addition to block nodes, you can create inline nodes, like '
        },
        {
          object: 'inline',
          key: '22',
          type: 'link',
          data: {
            href: 'https://en.wikipedia.org/wiki/Hypertext'
          },
          nodes: [
            {
              object: 'text',
              key: '14',
              text: 'hyperlinks'
            }
          ]
        },
        {
          object: 'text',
          key: '37',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      key: '40',
      type: 'bulleted-list',
      nodes: [
        {
          object: 'block',
          key: '95',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '16',
              text: 'bullet one'
            }
          ]
        },
        {
          object: 'block',
          key: '23',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '17',
              text: 'bullet two',
              marks: [{type: 'bold'}, {type: 'italic'}]
            }
          ]
        }
      ]
    },
    {
      object: 'block',
      key: '5',
      type: 'numbered-list',
      nodes: [
        {
          object: 'block',
          key: '18',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '20',
              text: 'nubmer one'
            }
          ]
        },
        {
          object: 'block',
          key: '24',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '19',
              text: 'number two',
              marks: [{type: 'italic'}]
            }
          ]
        }
      ]
    }
  ]
}
