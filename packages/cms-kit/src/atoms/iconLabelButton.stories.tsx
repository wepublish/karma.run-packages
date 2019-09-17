import React from 'react'
import {storiesOf} from '@storybook/react'
import {IconLabelButton} from './iconLabelButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

storiesOf('Atoms|Buttons/Icon/IconLabelButton', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <IconLabelButton icon={IconType.Replace} label={'Label'} />)
