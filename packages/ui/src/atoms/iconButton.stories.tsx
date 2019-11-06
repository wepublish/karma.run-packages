import React from 'react'

import {IconButton} from './iconButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconSaveOutlined} from '@karma.run/icons'

export default {
  component: IconButton,
  title: 'Input|Buttons/IconButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <IconButton icon={MaterialIconSaveOutlined} label={'Label'} />

export const Disabled = () => (
  <IconButton icon={MaterialIconSaveOutlined} label={'Label'} disabled />
)
