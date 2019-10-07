import React from 'react'

import {IconLabelButton} from './iconLabelButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconSaveOutlined} from '@karma.run/icons'

export default {
  component: IconLabelButton,
  title: 'Atoms|Buttons/Icon/IconLabelButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <IconLabelButton icon={MaterialIconSaveOutlined} label={'Label'} />

export const Disabled = () => (
  <IconLabelButton icon={MaterialIconSaveOutlined} label={'Label'} disabled />
)
