import React from 'react'
import {Button, LinkButton} from './button'
import {Box} from '../../layout/box'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {Spacing} from '../../style/helpers'
import {MaterialIconStarOutlined} from '@karma.run/icons'

export default {
  component: Button,
  title: 'Input|Buttons/Button',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Box flex flexDirection="row">
    <Box margin={Spacing.Tiny}>
      <Button label="Default" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Primary" color="primary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Secondary" color="secondary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Disabled" disabled />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button icon={MaterialIconStarOutlined} label="Icon" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <LinkButton label="Link" href="#" />
    </Box>
  </Box>
)

export const Outlined = () => (
  <Box flex flexDirection="row">
    <Box margin={Spacing.Tiny}>
      <Button label="Default" variant="outlined" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Primary" variant="outlined" color="primary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Secondary" variant="outlined" color="secondary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Disabled" variant="outlined" disabled />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button icon={MaterialIconStarOutlined} variant="outlined" label="Icon" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <LinkButton label="Link" variant="outlined" href="#" />
    </Box>
  </Box>
)

export const Text = () => (
  <Box flex flexDirection="row">
    <Box margin={Spacing.Tiny}>
      <Button label="Default" variant="text" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Primary" variant="text" color="primary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Secondary" variant="text" color="secondary" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button label="Disabled" variant="text" disabled />
    </Box>
    <Box margin={Spacing.Tiny}>
      <Button icon={MaterialIconStarOutlined} variant="text" label="Icon" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <LinkButton label="Link" variant="text" href="#" />
    </Box>
  </Box>
)
