import React from 'react'
import {configure, addDecorator} from '@storybook/react'

import {withKnobs} from '@storybook/addon-knobs'

import {StyleProvider, createStyleRenderer, renderStyles} from '@karma.run/react'
import {GlobalStyles} from '../style/globalStyles'

const req = require.context('../', true, /stories.tsx?$/)

function loadStories() {
  addDecorator(withKnobs)
  addDecorator(story => {
    const renderer = createStyleRenderer()
    renderStyles(renderer)
    return (
      <StyleProvider renderer={renderer}>
        <GlobalStyles />
        {story()}
      </StyleProvider>
    )
  })

  req.keys().forEach(req)
}

configure(loadStories, module)
