import React, {useState, useMemo} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toolbar, ToolbarButton, ToolbarDivider, ToolbarButtonProps} from './toolbar'
import {Typography} from '../layout/typography'
import {Link} from '../data/link'

import {
  MaterialIconFormatBold,
  MaterialIconFormatItalic,
  MaterialIconFormatUnderlined,
  MaterialIconFormatStrikethrough,
  MaterialIconLooksOneOutlined,
  MaterialIconLooksTwoOutlined,
  MaterialIconLooks3Outlined,
  MaterialIconFormatListBulleted,
  MaterialIconFormatListNumbered,
  MaterialIconLink
} from '@karma.run/icons'

import {createEditor, Node, Element, Editor} from 'slate'

import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderElementProps,
  RenderMarkProps
} from 'slate-react'

import {withHistory} from 'slate-history'
import {withSchema, SchemaRule} from 'slate-schema'

export default {
  component: Toolbar,
  title: 'Navigation|Toolbar',
  decorators: [centerLayoutDecorator(0.8)]
}

enum RichtextNodeType {
  H1 = 'heading-one',
  H2 = 'heading-two',
  H3 = 'heading-three',
  Paragraph = 'paragraph',
  UnorderedList = 'unordered-list',
  OrderedList = 'ordered-list',
  ListItem = 'list-item',
  Link = 'link'
}

enum RichtextMarkType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough'
}

function renderElement({attributes, children, element}: RenderElementProps) {
  switch (element.type) {
    case RichtextNodeType.H1:
      return (
        <Typography variant="h1" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextNodeType.H2:
      return (
        <Typography variant="h2" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextNodeType.H3:
      return (
        <Typography variant="h3" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextNodeType.Paragraph:
      return (
        <Typography variant="body1" spacing="large" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextNodeType.UnorderedList:
      return <ul {...attributes}>{children}</ul>

    case RichtextNodeType.OrderedList:
      return <ol {...attributes}>{children}</ol>

    case RichtextNodeType.ListItem:
      return <li {...attributes}>{children}</li>

    case RichtextNodeType.Link:
      return <Link {...attributes}>{children}</Link>
  }
}

function renderMark({attributes, children, mark}: RenderMarkProps) {
  switch (mark.type) {
    case RichtextMarkType.Bold:
      return <strong {...attributes}>{children}</strong>

    case RichtextMarkType.Italic:
      return <em {...attributes}>{children}</em>

    case RichtextMarkType.Underline:
      return <u {...attributes}>{children}</u>

    case RichtextMarkType.Strikethrough:
      return <del {...attributes}>{children}</del>
  }
}

const schema: SchemaRule[] = [
  {
    for: 'node',
    match: 'editor',
    validate: {
      children: [
        {
          match: [
            ([node]) =>
              node.type === RichtextNodeType.H1 ||
              node.type === RichtextNodeType.H2 ||
              node.type === RichtextNodeType.H3 ||
              node.type === RichtextNodeType.UnorderedList ||
              node.type === RichtextNodeType.OrderedList ||
              node.type === RichtextNodeType.Paragraph
          ]
        }
      ]
    },
    normalize: (editor, error) => {
      const {code, path} = error

      switch (code) {
        case 'child_invalid':
          Editor.setNodes(editor, {type: RichtextNodeType.Paragraph}, {at: path})
          break
      }
    }
  },

  {
    for: 'node',
    match: ([node]) =>
      node.type === RichtextNodeType.UnorderedList || node.type === RichtextNodeType.OrderedList,
    validate: {
      children: [{match: [([node]) => node.type === RichtextNodeType.ListItem]}]
    },
    normalize: (editor, error) => {
      const {code, path} = error

      switch (code) {
        case 'child_invalid':
          Editor.setNodes(editor, {type: RichtextNodeType.ListItem}, {at: path})
          break
      }
    }
  }
]

export const Default = () => {
  const [value, setValue] = useState<Node[]>(mockRichTextValue)
  const [hasFocus, setFocus] = useState(false)

  const editor = useMemo(
    () => withSchema(withRichText(withHistory(withReact(createEditor()))), schema),
    []
  )

  return (
    <Slate editor={editor} defaultValue={value} onChange={nodes => setValue(nodes)}>
      <>
        <Toolbar fadeOut={!hasFocus}>
          <SlateBlockButton icon={MaterialIconLooksOneOutlined} blockType={RichtextNodeType.H1} />
          <SlateBlockButton icon={MaterialIconLooksTwoOutlined} blockType={RichtextNodeType.H2} />
          <SlateBlockButton icon={MaterialIconLooks3Outlined} blockType={RichtextNodeType.H3} />
          <ToolbarDivider />
          <SlateBlockButton
            icon={MaterialIconFormatListBulleted}
            blockType={RichtextNodeType.UnorderedList}
          />
          <SlateBlockButton
            icon={MaterialIconFormatListNumbered}
            blockType={RichtextNodeType.OrderedList}
          />
          <ToolbarDivider />
          <SlateMarkButton icon={MaterialIconFormatBold} markType={RichtextMarkType.Bold} />
          <SlateMarkButton icon={MaterialIconFormatItalic} markType={RichtextMarkType.Italic} />
          <SlateMarkButton
            icon={MaterialIconFormatStrikethrough}
            markType={RichtextMarkType.Strikethrough}
          />
          <SlateMarkButton
            icon={MaterialIconFormatUnderlined}
            markType={RichtextMarkType.Underline}
          />
          <ToolbarDivider />
          <SlateLinkButton />
        </Toolbar>
        <Editable
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Start writing..."
          renderElement={renderElement}
          renderMark={renderMark}
        />
      </>
    </Slate>
  )
}

interface SlateBlockButtonProps extends ToolbarButtonProps {
  readonly blockType: RichtextNodeType
}

function SlateBlockButton({icon, blockType}: SlateBlockButtonProps) {
  const editor = useSlate()

  return (
    <ToolbarButton
      icon={icon}
      active={isBlockActive(editor, blockType)}
      onMouseDown={e => {
        e.preventDefault()
        editor.exec({type: 'toggle_block', block: blockType})
      }}
    />
  )
}

function SlateLinkButton() {
  const editor = useSlate()

  return (
    <ToolbarButton
      icon={MaterialIconLink}
      active={isBlockActive(editor, RichtextNodeType.Link)}
      onMouseDown={e => {
        e.preventDefault()

        if (isBlockActive(editor, RichtextNodeType.Link)) {
          editor.exec({type: 'remove_link'})
        } else {
          const url = window.prompt('Enter the URL of the link:')
          if (!url) return
          editor.exec({type: 'insert_link', url})
        }
      }}
    />
  )
}

interface SlateMarkButtonProps extends ToolbarButtonProps {
  readonly markType: RichtextMarkType
}

function SlateMarkButton({icon, markType}: SlateMarkButtonProps) {
  const editor = useSlate()

  return (
    <ToolbarButton
      icon={icon}
      active={isMarkActive(editor, markType)}
      onMouseDown={e => {
        e.preventDefault()
        editor.exec({type: 'toggle_mark', mark: markType})
      }}
    />
  )
}

function isBlockActive(editor: Editor, type: RichtextNodeType) {
  const {selection} = editor
  if (!selection) return false
  const match = Editor.match(editor, selection, {type})
  return !!match
}

function isMarkActive(editor: Editor, type: RichtextMarkType) {
  const marks = Editor.activeMarks(editor)
  const isActive = marks.some(mark => mark.type === type)
  return isActive
}

function unwrapLink(editor: Editor) {
  Editor.unwrapNodes(editor, {match: {type: RichtextNodeType.Link}})
}

function wrapLink(editor: Editor, url: string) {
  if (isBlockActive(editor, RichtextNodeType.Link)) {
    unwrapLink(editor)
  }

  const link = {type: 'link', url, children: []}
  Editor.wrapNodes(editor, link, {split: true})
  Editor.collapse(editor, {edge: 'end'})
}

function withRichText(editor: Editor): Editor {
  const {exec, isInline} = editor

  editor.isInline = node => (node.type === RichtextNodeType.Link ? true : isInline(node))

  editor.exec = command => {
    if (command.type === 'insert_link') {
      const {url} = command

      if (editor.selection) {
        wrapLink(editor, url)
      }

      return
    }

    if (command.type === 'remove_link') {
      unwrapLink(editor)
    }

    if (command.type === 'toggle_block') {
      const {block: type} = command
      const isActive = isBlockActive(editor, type)

      const isListType =
        type === RichtextNodeType.UnorderedList || type === RichtextNodeType.OrderedList

      Editor.unwrapNodes(editor, {match: {type: RichtextNodeType.UnorderedList}})
      Editor.unwrapNodes(editor, {match: {type: RichtextNodeType.OrderedList}})

      const newType = isActive
        ? RichtextNodeType.Paragraph
        : isListType
        ? RichtextNodeType.ListItem
        : type

      Editor.setNodes(editor, {type: newType})

      if (!isActive && isListType) {
        Editor.wrapNodes(editor, {type, children: []})
      }

      return
    }

    if (command.type === 'toggle_mark') {
      const {mark: type} = command
      const isActive = isMarkActive(editor, type)
      const cmd = isActive ? 'remove_mark' : 'add_mark'
      editor.exec({type: cmd, mark: {type}})
      return
    }

    exec(command)
  }

  return editor
}

const mockRichTextValue: Element[] = [
  {
    type: RichtextNodeType.H1,
    children: [
      {
        text: 'This is a H1',
        marks: []
      }
    ]
  },
  {
    type: RichtextNodeType.H2,
    children: [
      {
        text: 'This is a H2',
        marks: []
      }
    ]
  },
  {
    type: RichtextNodeType.H3,
    children: [
      {
        text: 'This is a H3',
        marks: []
      }
    ]
  },
  {
    type: RichtextNodeType.Paragraph,
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
        marks: []
      },
      {
        text: 'bold',
        marks: [{type: RichtextMarkType.Bold}]
      },
      {
        text: ', or ',
        marks: []
      },
      {
        text: 'italic',
        marks: [{type: RichtextMarkType.Italic}]
      },
      {
        text: '!',
        marks: []
      }
    ]
  },
  {
    type: RichtextNodeType.Paragraph,
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
        marks: []
      },
      {
        type: RichtextNodeType.Link,
        url: 'http://google.ch',
        children: [{text: 'links', marks: []}]
      },
      {
        text: '!',
        marks: []
      }
    ]
  },
  {
    type: RichtextNodeType.UnorderedList,
    children: [
      {
        type: RichtextNodeType.ListItem,
        children: [
          {
            text: 'Bullet one',
            marks: []
          }
        ]
      },
      {
        type: RichtextNodeType.ListItem,
        children: [
          {
            text: 'Bullet two',
            marks: [{type: RichtextMarkType.Bold}, {type: RichtextMarkType.Italic}]
          }
        ]
      }
    ]
  },
  {
    type: RichtextNodeType.OrderedList,
    children: [
      {
        type: RichtextNodeType.ListItem,
        children: [
          {
            text: 'Number one',
            marks: []
          }
        ]
      },
      {
        type: RichtextNodeType.ListItem,
        children: [
          {
            text: 'Number two',
            marks: [{type: RichtextMarkType.Bold}]
          }
        ]
      }
    ]
  }
]
