import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid, Column} from './grid'
import {Placeholder} from '../atoms/placeholder'
import {Spacing} from '../style/helpers'

export default {
  component: Grid,
  title: 'Layout|Grid',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <Grid spacing={Spacing.Tiny}>
    <Column>
      <Placeholder />
    </Column>
    <Column ratio={1 / 3}>
      <Placeholder />
      <Placeholder />
    </Column>
    <Column ratio={2 / 3}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 2}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 2}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 4}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 4}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 4}>
      <Placeholder />
    </Column>
    <Column ratio={1 / 4}>
      <Placeholder />
    </Column>
  </Grid>
)
