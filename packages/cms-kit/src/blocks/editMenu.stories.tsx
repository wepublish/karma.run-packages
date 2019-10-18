import React from 'react'

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

import {centerLayoutDecorator} from '../.storybook/decorators'
import {EditMenu, EditMenuButton} from './editMenu'
import {IconType} from '../atoms/icon'

export default {
  component: EditMenu,
  title: 'Blocks|Interactivty/RichtextEditorMenu',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <EditMenu>
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatBold}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatItalic}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatUnderlined}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatStrikethrough}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconLooksTwoOutlined}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconLooks3Outlined}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatListBulleted}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconFormatListNumbered}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={MaterialIconLink}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
  </EditMenu>
)
