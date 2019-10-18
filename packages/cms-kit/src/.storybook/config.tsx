import React from 'react'
import {configure, addDecorator} from '@storybook/react'

import {StyleProvider} from '@karma.run/react'
import {GlobalStyles} from '../style/globalStyles'
import {renderer} from './styleRenderer'

addDecorator(story => {
  return (
    <StyleProvider renderer={renderer}>
      <GlobalStyles rootElementID="root" />
      {story()}
    </StyleProvider>
  )
})

configure(
  [
    require.context('../atoms', true, /\.stories.tsx?$/),
    require.context('../molecules', true, /\.stories.tsx?$/),
    require.context('../organisms', true, /\.stories.tsx?$/),
    require.context('../blocks', true, /\.stories.tsx?$/),
    require.context('../layout', true, /\.stories.tsx?$/),
    require.context('../fields', true, /\.stories.tsx?$/),
    require.context('../templates', true, /\.stories.tsx?$/)
  ],
  module
)
