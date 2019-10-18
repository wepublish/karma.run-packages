import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FrontBlockActionBar} from './frontBlockActionBar'

export default {
  component: FrontBlockActionBar,
  title: 'Blocks|Interactivty/FrontBlockActionBar',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => <FrontBlockActionBar onEdit={() => {}} onReplace={() => {}} />
