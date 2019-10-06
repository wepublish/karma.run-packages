import React from 'react'
import {ButtonBar} from './buttonBar'

import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: ButtonBar,
  title: 'Atoms|Buttons/ButtonBar',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => (
  <ButtonBar
    cancelLabel={'cancel'}
    onCancel={() => {}}
    confirmLabel={'save'}
    onConfirm={() => {}}
  />
)

export const OnlyConfirm = () => <ButtonBar confirmLabel={'save'} onConfirm={() => {}} />
