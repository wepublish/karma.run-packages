import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FilterTag} from './filterTag'

export default {
  component: FilterTag,
  title: 'Atoms|FilterTag',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <FilterTag text={'Article tag'} onDismiss={() => {}} />
