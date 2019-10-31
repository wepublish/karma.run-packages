import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'

import {createStyleRenderer, renderStyles} from '@karma.run/react'
import {UIProvider} from '@karma.run/ui'

import {hot} from 'react-hot-loader/root'
import {App} from './app'
import {ElementID} from '../shared/elementID'
import {RouteProvider} from './route'
import {AuthProvider} from './authContext'

const HotApp = hot(App)

const onDOMContentLoaded = async () => {
  const styleRenderer = createStyleRenderer()
  renderStyles(styleRenderer)

  ReactDOM.render(
    <UIProvider styleRenderer={styleRenderer} rootElementID={ElementID.ReactRoot}>
      <AuthProvider>
        <RouteProvider>
          <HotApp />
        </RouteProvider>
      </AuthProvider>
    </UIProvider>,
    document.getElementById(ElementID.ReactRoot)
  )
}

if (document.readyState !== 'loading') {
  onDOMContentLoaded()
} else {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
}
