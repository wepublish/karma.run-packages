import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {ListItemWrapper} from './listItemWrapper'

storiesOf('Molecules|ListItemWrapper', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('default', () => (
    <ListItemWrapper onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
  ))
