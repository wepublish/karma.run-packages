import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid, Column} from './grid'
import {Spacing} from '../style/helpers'
import {PlaceholderInput} from '../input/placeholderInput'

export default {
  component: Grid,
  title: 'Layout|Grid',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <Grid spacing={Spacing.Tiny}>
    <Column>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 3}>
      <PlaceholderInput />
      <PlaceholderInput />
    </Column>
    <Column ratio={2 / 3}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 2}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 2}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 4}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 4}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 4}>
      <PlaceholderInput />
    </Column>
    <Column ratio={1 / 4}>
      <PlaceholderInput />
    </Column>
  </Grid>
)
