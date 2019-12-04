import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Checkbox} from './checkbox'

export default {
  component: Checkbox,
  title: 'Input|Checkbox',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Checkbox label={'Label'} checked={false} onChange={() => {}} />
export const Checked = () => <Checkbox label={'Label'} checked={true} onChange={() => {}} />

export const Disabled = () => (
  <Checkbox label={'Label'} checked={false} onChange={() => {}} disabled />
)

export const DisabledAndChecked = () => (
  <Checkbox label={'Label'} checked={true} onChange={() => {}} disabled />
)

export const Interactive = () => {
  const [isChecked, setChecked] = useState(false)
  return (
    <Checkbox
      label={'Label'}
      checked={isChecked}
      onChange={event => setChecked(event.currentTarget.checked)}
    />
  )
}
