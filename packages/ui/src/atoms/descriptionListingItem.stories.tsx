import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {DescriptionListingItem, DescriptionListing} from './descriptionListingItem'

export default {
  component: DescriptionListingItem,
  title: 'Atoms|DescriptionListingItem',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <DescriptionListing>
    <DescriptionListingItem label={'Label 1'} value={'Image & Title'} />
    <DescriptionListingItem label={'Label 2'} value={'Title & Lead'} />
    <DescriptionListingItem label={'Label 3'} value={'Title, Lead & Image'} />
  </DescriptionListing>
)
