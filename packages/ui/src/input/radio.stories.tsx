import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Radio} from './radio'

export default {
  component: Radio,
  title: 'Input|Radio',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Radio label="Label" checked={false} onChange={() => {}} />
export const Checked = () => <Radio label="Label" checked={true} onChange={() => {}} />

export const Disabled = () => <Radio label="Label" checked={false} onChange={() => {}} disabled />

export const DisabledAndChecked = () => (
  <Radio label="Label" checked={true} onChange={() => {}} disabled />
)
