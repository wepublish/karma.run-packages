import React from 'react'

import {centerLayoutDecorator, darkBackgroundDecorator} from '../.storybook/decorators'
import {FocalPoint} from '../molecules/imageMeta'

export default {
  component: FocalPoint,
  title: 'Atoms|FocalPoint',
  decorators: [darkBackgroundDecorator(), centerLayoutDecorator()]
}

export const Standard = () => <FocalPoint />
