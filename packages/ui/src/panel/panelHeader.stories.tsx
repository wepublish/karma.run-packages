import React from 'react'

import {MaterialIconArrowForward, MaterialIconSaveOutlined} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PanelHeader} from './panelHeader'
import {IconButton} from '../atoms/iconButton'

export default {
  component: PanelHeader,
  title: 'Panel|PanelHeader',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <PanelHeader
    title="Title"
    leftChildren={<IconButton icon={MaterialIconArrowForward} label={'Close'} />}
    rightChildren={<IconButton icon={MaterialIconSaveOutlined} label={'Save'} />}
  />
)
