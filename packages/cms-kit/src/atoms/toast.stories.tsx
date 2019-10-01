import React from 'react'
import {Toast, ToastType} from './toast'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Toast,
  title: 'Atoms|Toasts',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Info = () => <Toast type={ToastType.Info} text={'Info'} />
export const Success = () => <Toast type={ToastType.Success} text={'Success'} />
export const Error = () => <Toast type={ToastType.Error} text={'Error'} />
