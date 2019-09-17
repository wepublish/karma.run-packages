import React from 'react'
import {storiesOf} from '@storybook/react'
import {TextButton} from './textButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

storiesOf('Atoms|Buttons/Text/TextButton', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <TextButton label={'Label'} />)
