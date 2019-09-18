import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toggle} from './toggle'
import {Checkbox} from './checkbox'
import {RadioButton} from './radioButton'
import {ToggleWithLabel} from '../molecules/toggleWithLabel'

export function SelectWrapper() {
  const [checked, setChecked] = useState(false)

  return (
    <Toggle
      isChecked={checked}
      onChange={event => {
        setChecked(event.isChecked)
      }}
      id={'1'}
    />
  )
}

storiesOf('Atoms|Selects', module)
  .addDecorator(centerLayoutDecorator())
  .add('Toggle', () => <SelectWrapper />)
  .add('ToggleWithLabel', () => {
    return (
      <div>
        <ToggleWithLabel
          label={'Value'}
          description={'Description text'}
          isChecked={true}
          onChange={checked => {}}
          id={'4'}
        />
        <ToggleWithLabel
          label={'Value'}
          description={'Description text'}
          isChecked={false}
          onChange={checked => {}}
          id={'5'}
        />
      </div>
    )
  })
  .add('Checkbox', () => (
    <div>
      <Checkbox isChecked={true} onChange={checked => {}} label={'Checkbox label'} id={'2'} />
      <Checkbox isChecked={false} onChange={checked => {}} label={'Checkbox label'} id={'7'} />
    </div>
  ))
  .add('RadioButton', () => (
    <div>
      <RadioButton isChecked={true} onChange={checked => {}} label={'Radio label'} id={'3'} />
      <RadioButton isChecked={false} onChange={checked => {}} label={'Radio label'} id={'8'} />
    </div>
  ))
