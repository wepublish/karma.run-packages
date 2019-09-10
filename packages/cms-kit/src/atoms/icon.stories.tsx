import React from 'react'

import {storiesOf} from '@storybook/react'
import {Icon, IconType} from './icon'

import {centerLayoutDecorator, fontSizeDecorator} from '../.storybook/decorators'

storiesOf('Atoms|Icon/Base', module)
  .addDecorator(fontSizeDecorator(20))
  .addDecorator(centerLayoutDecorator())
  .add('All', () => (
    <>
      <Icon type={IconType.DropHere} />
      <Icon type={IconType.Replace} />
    </>
  ))
