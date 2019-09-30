import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid, GridColumn} from './grid'
import {Placeholder} from './placeholder'
import {Spacing} from '../style/helpers'

export default {
  component: Grid,
  title: 'Atoms|Grid',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <Grid spacing={Spacing.Tiny}>
    <GridColumn>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 3}>
      <Placeholder />
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={2 / 3}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 2}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 2}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 4}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 4}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 4}>
      <Placeholder />
    </GridColumn>
    <GridColumn ratio={1 / 4}>
      <Placeholder />
    </GridColumn>
  </Grid>
)
