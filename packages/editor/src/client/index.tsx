import React, {ComponentType} from 'react'
import ReactDOM from 'react-dom'

import {ElementID} from '../shared'

export interface ClientOptions {
  appComponent: ComponentType<{}>
}

export function mountClient(opts: ClientOptions): Promise<void> {
  return new Promise(resolve => {
    const onDOMContentLoaded = async () => {
      ReactDOM.render(<opts.appComponent />, document.getElementById(ElementID.ReactRoot), () =>
        resolve()
      )
    }

    if (document.readyState !== 'loading') {
      onDOMContentLoaded()
    } else {
      document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
    }
  })
}
