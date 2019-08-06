import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, {ComponentType} from 'react'
import ReactDOM from 'react-dom'

import {hot} from 'react-hot-loader/root'
import {App} from './app'

import {ElementID} from '../shared/elementIDs'

export interface ClientOptions {
  appComponent: ComponentType<{}>
}

const HotApp = hot(App)

const onDOMContentLoaded = async () => {
  ReactDOM.render(<HotApp />, document.getElementById(ElementID.ReactRoot))
}

if (document.readyState !== 'loading') {
  onDOMContentLoaded()
} else {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
}
