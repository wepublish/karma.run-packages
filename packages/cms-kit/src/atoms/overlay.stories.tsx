import React from 'react'

import {Overlay} from './overlay'
import {Input} from './input'
import {DescriptionListing, DescriptionListingItem} from './descriptionListingItem'

export default {
  component: Overlay,
  title: 'Atoms|Overlay'
}

export const PublishArticle = () => (
  <Overlay title={'Publish Article'} onConfirm={() => {}}>
    <Input
      label={'Publish state'}
      value={''}
      placeholder={''}
      description={'Set state to Proofreading or Live'}
      onValueChange={() => {}}
    />
    <DescriptionListing>
      <DescriptionListingItem label={'Teaser type'} value={'image & Title'} />
      <DescriptionListingItem label={'Title'} value={'Massenpanik am New Yorker Times Square'} />
      <DescriptionListingItem label={'Author'} value={'Gabriel Anliker'} />
      <DescriptionListingItem label={'Share with peers'} value={'Yes'} />
      <DescriptionListingItem label={'Hasthags'} value={'Tag1, Tag2, Tag3'} />
      <DescriptionListingItem label={'Publish date'} value={'08.08.2019'} />
      <DescriptionListingItem label={'Expire date'} value={'None'} />
    </DescriptionListing>
  </Overlay>
)
