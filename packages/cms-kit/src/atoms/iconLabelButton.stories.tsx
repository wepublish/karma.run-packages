import React from 'react'

import {IconLabelButton} from './iconLabelButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

export default {
  component: IconLabelButton,
  title: 'Atoms|Buttons/Icon/IconLabelButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <IconLabelButton icon={IconType.Replace} label={'Label'} />
