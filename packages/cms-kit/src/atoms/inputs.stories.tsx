import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {Input} from './input'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'
import {TextArea} from './textArea'

export function TextInputWrapper() {
  const [value, setValue] = useState('')

  return (
    <Input
      label={'Label'}
      value={value}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {
        setValue(value)
      }}
    />
  )
}

export function TextAreaInputWrapper() {
  const [value, setValue] = useState('')

  return (
    <TextArea
      value={value}
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {
        setValue(value)
      }}
    />
  )
}

storiesOf('Atoms|Input/Single', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <TextInputWrapper />)

  .add('error', () => (
    <Input
      label={'Label'}
      value={''}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      errorDescription={'Error text'}
      onValueChange={value => {}}
    />
  ))
  .add('icon', () => (
    <Input
      label={'Label'}
      value={''}
      icon={IconType.DropHere}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))

storiesOf('Atoms|Input/TextArea', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <TextAreaInputWrapper />)

  .add('default with value', () => (
    <TextArea
      label={'Label'}
      value={
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
      }
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
