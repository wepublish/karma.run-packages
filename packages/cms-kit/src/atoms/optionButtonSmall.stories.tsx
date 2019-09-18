import React from 'react'
import {OptionButtonSmall} from './optionButtonSmall'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

export default {
  component: OptionButtonSmall,
  title: 'Atoms|Buttons/Icon/OptionButtonSmall',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <OptionButtonSmall icon={IconType.Add} />
export const Disabled = () => <OptionButtonSmall icon={IconType.Add} disabled />
