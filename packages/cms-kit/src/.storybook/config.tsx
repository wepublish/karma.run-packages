import React from 'react'
import {configure, addDecorator} from '@storybook/react'

import {withKnobs} from '@storybook/addon-knobs'

import {StyleProvider} from '@karma.run/react'
import {GlobalStyles} from '../style/globalStyles'
import {renderer} from './styleRenderer'

const req = require.context('../', true, /stories.tsx?$/)

function loadStories() {
  addDecorator(withKnobs)
  addDecorator(story => {
    return (
      <StyleProvider renderer={renderer}>
        <GlobalStyles rootElementID="root" />
        {story()}
      </StyleProvider>
    )
  })

  req.keys().forEach(req)
}

configure(loadStories, module)
