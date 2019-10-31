import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Box} from './box'
import {Spacing} from '../style/helpers'

export default {
  component: Box,
  title: 'Layout|Box',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Box margin={Spacing.Tiny} padding={Spacing.Medium}>
    Box
  </Box>
)
