import React from 'react'

import {OutlineButton} from './outlineButton'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: OutlineButton,
  title: 'Atoms|Buttons/Text/OutlineButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <OutlineButton label={'Label'} />
