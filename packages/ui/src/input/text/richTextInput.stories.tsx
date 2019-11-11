import React, {useState} from 'react'

import {Value, DocumentJSON, ValueJSON, Editor as CoreEditor} from 'slate'
import {RenderMarkProps, RenderBlockProps, Plugin} from 'slate-react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {RichTextInput, RichTextMenuPlugin} from './richTextInput'

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
  component: RichTextInput,
  title: 'Input|Text/RichTextInput',
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

const DEFAULT_NODE = 'paragraph'

function renderMark(props: RenderMarkProps, editor: CoreEditor, next: () => any) {
  const {children, mark, attributes} = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underline':
      return <u {...attributes}>{children}</u>
    case 'strikethrough':
      return <del {...attributes}>{children}</del>
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
    editor.setBlocks(isActive ? DEFAULT_NODE : type)
  }
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
}

const standardRichTextEditItems = [
  {
    icon: MaterialIconFormatBold,
    label: 'bold',
    onApply: toggleMark,
    isActive: hasMark
  },
  {
    icon: MaterialIconFormatItalic,
    label: 'italic',
    onApply: toggleMark,
    isActive: hasMark
  },
  {
    icon: MaterialIconFormatUnderlined,
    label: 'underline',
    onApply: toggleMark,
    isActive: hasMark
  },
  {
    icon: MaterialIconFormatStrikethrough,
    label: 'strikethrough',
    onApply: toggleMark,
    isActive: hasMark
  },
  {
    icon: MaterialIconLooksTwoOutlined,
    label: 'heading-two',
    onApply: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, true),
    isActive: hasType
  },
  {
    icon: MaterialIconLooks3Outlined,
    label: 'heading-three',
    onApply: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, false),
    isActive: hasType
  },
  {
    icon: MaterialIconFormatListBulleted,
    label: 'bulleted-list',
    onApply: (editor: CoreEditor, value: Value) =>
      toggleList(editor, value, RichtextType.BulletList),
    isActive: isListOfType
  },
  {
    icon: MaterialIconFormatListNumbered,
    label: 'numbered-list',
    onApply: (editor: CoreEditor, value: Value) =>
      toggleList(editor, value, RichtextType.NumberedList),
    isActive: isListOfType
  },
  {
    icon: MaterialIconLink,
    label: 'link',
    onApply: (editor: CoreEditor, value: Value) => {}, // todo open side panel to enter href
    isActive: hasInlines
  }
]

const plugins: Plugin[] = [RichTextMenuPlugin(standardRichTextEditItems), {renderBlock, renderMark}]

export const Standard = () => {
  const val: ValueJSON = {object: 'value', document: {...mockRichTextValue}}
  const [stateValue, setStateValue] = useState(Value.create(val))

  return (
    <RichTextInput
      value={stateValue}
      onChange={({value}) => setStateValue(value)}
      plugins={plugins}
    />
  )
}

const mockRichTextValue: DocumentJSON = {
  object: 'document',
  nodes: [
    {
      object: 'block',
      type: 'heading-two',
      nodes: [
        {
          object: 'text',
          text: 'This is a H2 '
        }
      ]
    },
    {
      object: 'block',
      type: 'heading-three',
      nodes: [
        {
          object: 'text',
          text: 'This is a H3'
        }
      ]
    },
    {
      object: 'block',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          text: "Since it's rich text, you can do things like turn a selection of text "
        },
        {
          object: 'text',
          text: 'bold',
          marks: [{type: 'bold'}]
        },
        {
          object: 'text',
          text: ', or '
        },
        {
          object: 'text',
          text: 'italic',
          marks: [{type: 'italic'}]
        },
        {
          object: 'text',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          text: 'In addition to block nodes, you can create inline nodes, like '
        },
        {
          object: 'inline',
          type: 'link',
          data: {
            href: 'https://en.wikipedia.org/wiki/Hypertext'
          },
          nodes: [
            {
              object: 'text',
              text: 'hyperlinks'
            }
          ]
        },
        {
          object: 'text',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      type: 'bulleted-list',
      nodes: [
        {
          object: 'block',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              text: 'bullet one'
            }
          ]
        },
        {
          object: 'block',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              text: 'bullet two',
              marks: [{type: 'bold'}, {type: 'italic'}]
            }
          ]
        }
      ]
    },
    {
      object: 'block',
      type: 'numbered-list',
      nodes: [
        {
          object: 'block',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              text: 'nubmer one'
            }
          ]
        },
        {
          object: 'block',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              text: 'number two',
              marks: [{type: 'italic'}]
            }
          ]
        }
      ]
    }
  ]
}
