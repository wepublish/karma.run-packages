import {hot} from 'react-hot-loader/root'
import {mountClient} from '@dudagroup/editor/client'
import {App} from './app'

mountClient({
  appComponent: hot(App)
})
