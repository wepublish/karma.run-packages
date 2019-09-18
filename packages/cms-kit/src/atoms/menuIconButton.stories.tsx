import React from 'react'
import {storiesOf} from '@storybook/react'
import {MenuIconButton} from './menuIconButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType, IconSize} from './icon'

storiesOf('Atoms|Buttons/Icon/Menu', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => (
    <MenuIconButton icon={IconType.Replace} iconSize={IconSize.Default} title={'menu item'} />
  ))
