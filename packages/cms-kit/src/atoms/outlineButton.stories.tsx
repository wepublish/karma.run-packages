import React from 'react'
import {storiesOf} from '@storybook/react'
import {OutlineButton} from './outlineButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

storiesOf('Atoms|Buttons/Text/OutlineButton', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <OutlineButton label={'Label'} />)
