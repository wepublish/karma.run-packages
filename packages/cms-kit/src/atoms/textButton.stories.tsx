import React from 'react'

import {TextButton} from './textButton'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: TextButton,
  title: 'Atoms|Buttons/Text/TextButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <TextButton label={'Label'} />
