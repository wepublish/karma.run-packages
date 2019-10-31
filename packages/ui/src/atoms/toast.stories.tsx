import React from 'react'
import {Toast, ToastType} from './toast'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Toast,
  title: 'Atoms|Toasts',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Info = () => <Toast type={ToastType.Info}>Info</Toast>
export const Success = () => <Toast type={ToastType.Success}>Success</Toast>
export const Error = () => <Toast type={ToastType.Error}>Error</Toast>
