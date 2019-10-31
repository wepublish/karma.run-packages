import React from 'react'

import {ProgressBar} from './progressBar'

import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: ProgressBar,
  title: 'Atoms|ProgressBar',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => <ProgressBar progress={30} onCancel={() => {}} />
