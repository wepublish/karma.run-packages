import React from 'react'

import {Icon} from './icon'
import {centerLayoutDecorator, fontSizeDecorator} from '../.storybook/decorators'
import {MaterialIconAdd} from '@karma.run/icons'

export default {
  component: Icon,
  title: 'Atoms|Icon',
  decorators: [centerLayoutDecorator(), fontSizeDecorator(24)]
}

export const Standard = () => <Icon element={MaterialIconAdd} block />
