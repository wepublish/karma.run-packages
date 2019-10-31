import React from 'react'

import {centerLayoutDecorator, InfoBox} from '../.storybook/decorators'
import {Typography} from './typography'
import {Spacing} from '../style/helpers'

export default {
  component: Typography,
  title: 'Layout|Typography',
  decorators: [centerLayoutDecorator()]
}

export const All = () => (
  <>
    <InfoBox label="title">
      <Typography variant="title">Title</Typography>
    </InfoBox>
    <InfoBox label="h1">
      <Typography variant="h1">Heading 1</Typography>
    </InfoBox>
    <InfoBox label="h2">
      <Typography variant="h2">Heading 2</Typography>
    </InfoBox>
    <InfoBox label="h3">
      <Typography variant="h3">Heading 3</Typography>
    </InfoBox>
    <InfoBox label="body1">
      <Typography variant="body1">Body 1</Typography>
    </InfoBox>
    <InfoBox label="body2">
      <Typography variant="body2">Body 2</Typography>
    </InfoBox>
    <InfoBox label="subtitle1">
      <Typography variant="subtitle1">Subtitle 1</Typography>
    </InfoBox>
    <InfoBox label="subtitle2">
      <Typography variant="subtitle2">Subtitle 2</Typography>
    </InfoBox>
  </>
)

export const Text = () => (
  <>
    <Typography variant="title" spacing="small">
      Title
    </Typography>
    <Typography variant="body1" spacing="large">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed urna nec lorem tincidunt
      porttitor. Nulla facilisi. Nulla lacinia porta odio, in tincidunt nibh auctor et. Quisque
      mattis tempor massa, pharetra tempus sapien bibendum vitae. Curabitur ligula lacus, aliquam ut
      aliquam non, varius vitae erat. Duis ac lacus ac nibh sodales molestie. Cras ornare nulla in
      felis vulputate, et imperdiet tellus interdum.
    </Typography>
    <Typography variant="h1" spacing="small">
      Heading 1
    </Typography>
    <Typography variant="body1" spacing="large">
      Pellentesque scelerisque nulla quis sapien suscipit, nec aliquet diam consectetur. Donec
      rutrum lectus sit amet velit fermentum, eget tincidunt magna gravida. Maecenas vehicula, purus
      pellentesque bibendum gravida, ex urna aliquet est, et bibendum purus elit eget libero. Nam
      ligula mauris, pharetra vitae venenatis quis, auctor mattis mi. Pellentesque vitae lacinia
      risus. Morbi id consectetur urna.
    </Typography>
    <Typography variant="h2" spacing="small">
      Heading 2
    </Typography>
    <Typography variant="body1" spacing="large">
      Integer ut orci accumsan, elementum turpis non, lacinia odio. Aenean a aliquam magna. Vivamus
      scelerisque ac eros quis scelerisque. Mauris et vulputate lorem. Quisque scelerisque magna et
      tellus consequat, id suscipit magna volutpat. Suspendisse id vestibulum dolor. Curabitur eros
      ligula, faucibus at sollicitudin in, convallis pharetra elit. Cras sagittis, lorem et euismod
      molestie, sapien magna fringilla lectus, auctor consequat augue arcu a tortor.
    </Typography>
    <Typography variant="h3" spacing="small">
      Heading 3
    </Typography>
    <Typography variant="body2" spacing="small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed urna nec lorem tincidunt
      porttitor. Nulla facilisi. Nulla lacinia porta odio, in tincidunt nibh auctor et. Quisque
      mattis tempor massa, pharetra tempus sapien bibendum vitae. Curabitur ligula lacus, aliquam ut
      aliquam non, varius vitae erat. Duis ac lacus ac nibh sodales molestie. Cras ornare nulla in
      felis vulputate, et imperdiet tellus interdum.
    </Typography>
    <Typography variant="subtitle1" spacing="small">
      Pellentesque scelerisque nulla quis sapien suscipit, nec aliquet diam consectetur. Donec
      rutrum lectus sit amet velit fermentum, eget tincidunt magna gravida. Maecenas vehicula, purus
      pellentesque bibendum gravida, ex urna aliquet est, et bibendum purus elit eget libero. Nam
      ligula mauris, pharetra vitae venenatis quis, auctor mattis mi. Pellentesque vitae lacinia
      risus. Morbi id consectetur urna.
    </Typography>
    <Typography variant="subtitle2" spacing="large">
      Integer ut orci accumsan, elementum turpis non, lacinia odio. Aenean a aliquam magna. Vivamus
      scelerisque ac eros quis scelerisque. Mauris et vulputate lorem. Quisque scelerisque magna et
      tellus consequat, id suscipit magna volutpat. Suspendisse id vestibulum dolor. Curabitur eros
      ligula, faucibus at sollicitudin in, convallis pharetra elit. Cras sagittis, lorem et euismod
      molestie, sapien magna fringilla lectus, auctor consequat augue arcu a tortor.
    </Typography>
  </>
)
