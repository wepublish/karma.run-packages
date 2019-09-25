import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {InfoListingItem} from './infoListingItem'

export default {
  component: InfoListingItem,
  title: 'Atoms|InfoListingItem',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <InfoListingItem label={'Teaser type'} value={'image & Title'} />
