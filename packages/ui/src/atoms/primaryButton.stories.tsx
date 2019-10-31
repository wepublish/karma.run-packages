import React from 'react'
import {PrimaryButton, PrimaryLinkButton} from './primaryButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: PrimaryButton,
  title: 'Input|Buttons/PrimaryButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <PrimaryButton label="Label" />
export const Disabled = () => <PrimaryButton label="Label" disabled />

export const Link = () => <PrimaryLinkButton href="#" label="Label" />
