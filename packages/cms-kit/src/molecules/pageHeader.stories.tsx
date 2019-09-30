import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PageHeader} from './pageHeader'

export default {
  component: PageHeader,
  title: 'Molecules|PageHeader',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <PageHeader
    title={'Article overview'}
    buttonLabel={'New Article'}
    onClick={() => {}}
    filterOptions={[{id: '1', name: 'filter'}]}
    searchValue={''}
    onFilterSelected={() => {}}
    onTextInput={() => {}}
    onClear={() => {}}></PageHeader>
)
