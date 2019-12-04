import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toggle} from './toggle'

export default {
  component: Toggle,
  title: 'Input|Toggle',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [isChecked, setChecked] = useState(false)

  return (
    <Toggle
      label="Label"
      description="Description"
      checked={isChecked}
      onChange={event => setChecked(event.target.checked)}
    />
  )
}

export const WithoutLabel = () => {
  const [isChecked, setChecked] = useState(false)

  return <Toggle checked={isChecked} onChange={event => setChecked(!isChecked)} />
}

export const Unchecked = () => <Toggle checked={false} onChange={() => {}} />
export const Checked = () => <Toggle checked={true} onChange={() => {}} />
export const Disabled = () => <Toggle checked={true} onChange={() => {}} disabled />
