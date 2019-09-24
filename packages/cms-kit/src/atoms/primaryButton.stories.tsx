import React from 'react'
import {PrimaryButton} from './primaryButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: PrimaryButton,
  title: 'Atoms|Buttons/Text/PrimaryButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <PrimaryButton label={'Label'} />

export const Disabled = () => <PrimaryButton label={'Label'} disabled />
