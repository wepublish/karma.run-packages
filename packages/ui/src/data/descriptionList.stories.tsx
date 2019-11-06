import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {DescriptionList, DescriptionListItem} from './descriptionList'

export default {
  component: DescriptionList,
  title: 'Data|DescriptionList',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <DescriptionList>
    <DescriptionListItem label="Filename">test.png</DescriptionListItem>
    <DescriptionListItem label="Dimensions">300x200</DescriptionListItem>
    <DescriptionListItem label="File Size">1.5 MB</DescriptionListItem>
  </DescriptionList>
)
