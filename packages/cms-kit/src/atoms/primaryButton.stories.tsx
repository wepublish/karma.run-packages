import React from 'react'
import {storiesOf} from '@storybook/react'
import {PrimaryButton} from './primaryButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

storiesOf('Atoms|Buttons/Text/PrimaryButton', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <PrimaryButton label={'Label'} />)
