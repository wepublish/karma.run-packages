import React from 'react'
import {IconButton} from './iconButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {
  MaterialIconKeyboardArrowDown,
  MaterialIconMoreVert,
  MaterialIconAdd
} from '@karma.run/icons'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'

export default {
  component: IconButton,
  title: 'Buttons|IconButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <>
    <Box display="flex" flexDirection="row">
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} />
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} active />
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} disabled />
    </Box>
  </>
)

export const Light = () => (
  <>
    <Box display="flex" flexDirection="row">
      <IconButton icon={MaterialIconMoreVert} margin={Spacing.Tiny} variant="light" />
      <IconButton icon={MaterialIconMoreVert} margin={Spacing.Tiny} variant="light" active />
      <IconButton icon={MaterialIconMoreVert} margin={Spacing.Tiny} variant="light" disabled />
    </Box>
  </>
)

export const Large = () => (
  <>
    <Box display="flex" flexDirection="row">
      <IconButton icon={MaterialIconAdd} margin={Spacing.Tiny} variant="large" />
      <IconButton icon={MaterialIconAdd} margin={Spacing.Tiny} variant="large" active />
      <IconButton icon={MaterialIconAdd} margin={Spacing.Tiny} variant="large" disabled />
    </Box>
  </>
)
