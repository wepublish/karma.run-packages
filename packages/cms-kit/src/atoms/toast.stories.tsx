import React from 'react'
import {Toast, ToastType} from './toast'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Toast,
  title: 'Atoms|Toasts',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Info = () => (
  <Toast type={ToastType.Info} text={'Something went wrong, please try again later'} />
)

export const Action = () => <Toast type={ToastType.Action} text={'Alert message'} />

export const Success = () => <Toast type={ToastType.Success} text={'Saved successfully'} />

export const Error = () => (
  <Toast type={ToastType.Error} text={'Something went wrong, please try again later'} />
)
