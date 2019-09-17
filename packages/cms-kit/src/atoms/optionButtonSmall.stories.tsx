import React from 'react'
import {storiesOf} from '@storybook/react'
import {OptionButtonSmall} from './optionButtonSmall'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

storiesOf('Atoms|Buttons/Icon/OptionButtonSmall', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <OptionButtonSmall icon={IconType.Add} />)
  .add('disabled', () => <OptionButtonSmall icon={IconType.Add} disabled />)
