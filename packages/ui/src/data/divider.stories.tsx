import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Divider} from './divider'
import {Typography} from '../layout/typography'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'
import {Card} from '../data/card'

export default {
  component: Divider,
  title: 'Data|Divider',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <Card>
    <Box padding={Spacing.Small}>
      <Typography variant="h1">Test</Typography>
    </Box>
    <Divider />
    <Box padding={Spacing.Small}>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed urna nec lorem
        tincidunt porttitor. Nulla facilisi. Nulla lacinia porta odio, in tincidunt nibh auctor et.
        Quisque mattis tempor massa, pharetra tempus sapien bibendum vitae. Curabitur ligula lacus,
        aliquam ut aliquam non, varius vitae erat. Duis ac lacus ac nibh sodales molestie. Cras
        ornare nulla in felis vulputate, et imperdiet tellus interdum.
      </Typography>
    </Box>
  </Card>
)
