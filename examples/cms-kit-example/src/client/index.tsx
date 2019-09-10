import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import {createStyleRenderer, renderStyles} from '@karma.run/react'
import {CMSKitProvider} from '@karma.run/cms-kit'

import {hot} from 'react-hot-loader/root'
import {App} from './app'
import {ElementID} from '../shared/elementID'

const HotApp = hot(App)

const onDOMContentLoaded = async () => {
  const styleRenderer = createStyleRenderer()
  renderStyles(styleRenderer)

  ReactDOM.render(
    <CMSKitProvider styleRenderer={styleRenderer} rootElementID={ElementID.ReactRoot}>
      <HotApp />
    </CMSKitProvider>,
    document.getElementById(ElementID.ReactRoot)
  )
}

if (document.readyState !== 'loading') {
  onDOMContentLoaded()
} else {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
}
