import React from 'react'
import {storiesOf} from '@storybook/react'
import {OptionButton} from './optionButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

storiesOf('Atoms|Buttons/Icon/OptionButton', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <OptionButton icon={IconType.Replace} />)
