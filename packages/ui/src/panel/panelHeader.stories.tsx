import React from 'react'

import {MaterialIconArrowForward, MaterialIconSaveOutlined} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PanelHeader} from './panelHeader'
import {NavigationButton} from '../buttons/navigationButton'

export default {
  component: PanelHeader,
  title: 'Panel|PanelHeader',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <PanelHeader
    title="Title"
    leftChildren={<NavigationButton icon={MaterialIconArrowForward} label={'Close'} />}
    rightChildren={<NavigationButton icon={MaterialIconSaveOutlined} label={'Save'} />}
  />
)
