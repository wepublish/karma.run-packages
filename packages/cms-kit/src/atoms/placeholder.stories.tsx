import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'

import {Placeholder} from './placeholder'

storiesOf('Atoms|Placeholder', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <Placeholder></Placeholder>)
