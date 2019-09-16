import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid} from './grid'
import {Card} from './card'
import {Placeholder} from './placeholder'

storiesOf('Atoms|Grid', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('default', () => (
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
  ))
