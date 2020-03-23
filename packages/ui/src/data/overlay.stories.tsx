import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Card} from './card'
import {Overlay} from './overlay'
import {Typography} from '../layout/typography'
import {Spacing} from '../style/helpers'

import {Default as DefaultDescriptionList} from './descriptionList.stories'
import {Image} from './image'
import {randomImageURL} from '../.storybook/util'

export default {
  component: Overlay,
  title: 'Data|Overlay',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Card position="relative" overflow="hidden">
    <Image src={randomImageURL(300, 400)} width={300} height={400} />
    <Overlay bottom={0} width="100%" padding={Spacing.Small}>
      <Typography variant="subtitle1" color="gray">
        Lorem ipsum
      </Typography>
      <Typography variant="body1" color="white" spacing="large">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <DefaultDescriptionList />
    </Overlay>
  </Card>
)
