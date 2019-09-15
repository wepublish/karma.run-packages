import React from 'react'

import {storiesOf} from '@storybook/react'
import {Input} from './input'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'
import {TextArea} from './textArea'
import {FilterTag} from './filterTag'

storiesOf('Atoms|Inputs', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => (
    <Input
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      hasError={false}
      onValueChange={value => {}}
    />
  ))
  .add('no label', () => (
    <Input
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      hasError={false}
      onValueChange={value => {}}
    />
  ))
  .add('error', () => (
    <Input
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      hasError={true}
      errorText={'Error text'}
      onValueChange={value => {}}
    />
  ))
  .add('icon', () => (
    <Input
      icon={IconType.DropHere}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      hasError={false}
      onValueChange={value => {}}
    />
  ))

storiesOf('Atoms|TextArea', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => (
    <TextArea
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('with label', () => (
    <TextArea
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))

storiesOf('Atoms|FilterTag', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <FilterTag text={'Article tag'} onDismiss={() => {}} />)
