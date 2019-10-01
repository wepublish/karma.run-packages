import React from 'react'

import {Modal} from './modal'
import {TextInput} from './textInput'
import {DescriptionListing, DescriptionListingItem} from './descriptionListingItem'

export default {
  component: Modal,
  title: 'Atoms|Modal'
}

export const PublishArticle = () => (
  <Modal title={'Publish Article'} onConfirm={() => {}} onCancel={() => {}}>
    <TextInput
      label={'Publish state'}
      value={''}
      description={'Set state to Proofreading or Live'}
      onChange={() => {}}
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
  </Modal>
)
