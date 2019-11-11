import React from 'react'
import {OptionButton} from './optionButton'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {MaterialIconAdd} from '@karma.run/icons'

export default {
  component: OptionButton,
  title: 'Atoms|Buttons/Icon/OptionButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <OptionButton icon={MaterialIconAdd} />

export const Disabled = () => <OptionButton icon={MaterialIconAdd} disabled />
