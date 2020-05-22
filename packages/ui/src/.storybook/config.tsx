import React from 'react'
import {configure, addDecorator} from '@storybook/react'

import {renderer} from './styleRenderer'
import {UIProvider} from '../utility'

addDecorator(story => {
  return (
    <UIProvider rootElementID="root" styleRenderer={renderer}>
      {story()}
    </UIProvider>
  )
})

configure(
  [
    require.context('../data', true, /\.stories.tsx?$/),
    require.context('../buttons', true, /\.stories.tsx?$/),
    require.context('../blocks', true, /\.stories.tsx?$/),
    require.context('../input', true, /\.stories.tsx?$/),
    require.context('../feedback', true, /\.stories.tsx?$/),
    require.context('../panel', true, /\.stories.tsx?$/),
    require.context('../interaction', true, /\.stories.tsx?$/),
    require.context('../modal', true, /\.stories.tsx?$/),
    require.context('../navigation', true, /\.stories.tsx?$/),
    require.context('../layout', true, /\.stories.tsx?$/),
    require.context('../templates', true, /\.stories.tsx?$/),
    require.context('../', true, /\.stories.tsx?$/)
  ],
  module
)
