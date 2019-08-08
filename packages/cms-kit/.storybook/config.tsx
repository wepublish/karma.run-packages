import React from 'react'
import {configure, addDecorator} from '@storybook/react'

import {withInfo} from '@storybook/addon-info'
import {withKnobs} from '@storybook/addon-knobs'

import {StyleProvider, createStyleRenderer, renderStyles} from '@karma.run/react'

const req = require.context('../src', true, /stories.tsx?$/)

function loadStories() {
  addDecorator(withInfo)
  addDecorator(withKnobs)
  addDecorator(story => {
    const renderer = createStyleRenderer()
    renderStyles(renderer)
    return <StyleProvider renderer={renderer}>{story()}</StyleProvider>
  })

  req.keys().forEach(req)
}

configure(loadStories, module)
