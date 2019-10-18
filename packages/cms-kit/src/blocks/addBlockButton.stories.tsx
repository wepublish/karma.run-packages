import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockButton} from './addBlockButton'

export default {
  component: AddBlockButton,
  title: 'Blocks|Interactivty/AddBlockButton',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => <AddBlockButton onClick={() => {}} />
