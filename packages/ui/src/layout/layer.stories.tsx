import React from 'react'
import {MaterialIconDelete, MaterialIconEdit} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {LayerContainer, Layer} from './layer'
import {Image} from '../data/image'
import {IconButton} from '../buttons/iconButton'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'

export default {
  component: Layer,
  title: 'Layout|Layer',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => {
  return (
    <LayerContainer>
      <Image
        src="https://dummyimage.com/300x300/999/fff"
        width="100%"
        height={300}
        imageWidth={300}
        imageHeight={300}
      />
      <Layer top={0} right={0}>
        <Box padding={Spacing.Small} height="100%" justifyContent="flex-end" display="flex">
          <IconButton icon={MaterialIconEdit} marginRight={Spacing.ExtraSmall} />
          <IconButton icon={MaterialIconDelete} />
        </Box>
      </Layer>
    </LayerContainer>
  )
}
