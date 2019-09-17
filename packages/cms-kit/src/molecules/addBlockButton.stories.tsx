import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockButton} from './addBlockButton'

storiesOf('Molecules|AddBlock', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('default', () => <AddBlockButton onClick={() => {}} />)
