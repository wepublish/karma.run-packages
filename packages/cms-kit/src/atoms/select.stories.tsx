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
      checked={checked}
      onSelectChange={event => {
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
          onSelectChange={checked => {}}
          id={'4'}
          checked
        />
        <ToggleWithLabel
          label={'Value'}
          description={'Description text'}
          onSelectChange={checked => {}}
          id={'5'}
        />
      </div>
    )
  })
  .add('Checkbox', () => (
    <React.Fragment>
      <Checkbox isChecked={true} onChange={checked => {}} label={'Checkbox label'} id={'2'} />
      <Checkbox isChecked={false} onChange={checked => {}} label={'Checkbox label'} id={'7'} />
    </React.Fragment>
  ))
  .add('RadioButton', () => (
    <React.Fragment>
      <RadioButton isChecked={true} onChange={checked => {}} label={'Radio label'} id={'3'} />
      <RadioButton isChecked={false} onChange={checked => {}} label={'Radio label'} id={'8'} />
    </React.Fragment>
  ))
