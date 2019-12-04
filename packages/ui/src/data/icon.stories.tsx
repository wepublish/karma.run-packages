import React from 'react'

import {Icon} from './icon'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconAdd} from '@karma.run/icons'

export default {
  component: Icon,
  title: 'Data|Icon',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Icon element={MaterialIconAdd} block />
