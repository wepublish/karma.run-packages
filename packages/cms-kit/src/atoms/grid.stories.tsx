import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid} from './grid'
import {Placeholder} from './placeholder'
import {Card} from './card'

export default {
  component: Grid,
  title: 'Atoms|Grid',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <Grid numColumns={3}>
    <Card>
      <Placeholder />
    </Card>
    <Card>
      <Placeholder />
    </Card>
    <Card>
      <Placeholder />
    </Card>
  </Grid>
)
