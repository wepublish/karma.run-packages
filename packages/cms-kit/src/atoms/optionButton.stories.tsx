import React from 'react'
import {OptionButton} from './optionButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

export default {
  component: OptionButton,
  title: 'Atoms|Buttons/Icon/OptionButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <OptionButton icon={IconType.Add} />

export const Disabled = () => <OptionButton icon={IconType.Add} disabled />
