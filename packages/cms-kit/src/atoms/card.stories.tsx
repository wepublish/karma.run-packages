import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'

import {Card} from './card'

storiesOf('Atoms|Card', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <Card>Hello World</Card>)
