import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FocalPointSetter} from './imageMeta'

export default {
  component: FocalPointSetter,
  title: 'Molecules|FocalPointSetter',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <FocalPointSetter imgSrc={'https://dummyimage.com/440x290/ba37ba/fff'} width={440} height={290} />
)
