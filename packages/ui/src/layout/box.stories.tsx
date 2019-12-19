import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Box} from './box'
import {Spacing} from '../style/helpers'
import {IconButton} from '../buttons/iconButton'
import {MaterialIconEdit, MaterialIconDelete} from '@karma.run/icons'
import {Image} from '../data/image'

export default {
  component: Box,
  title: 'Layout|Box',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => {
  return (
    <Box position="relative" width="100%" height="100%">
      <Image
        src="https://dummyimage.com/300x300/999/fff"
        width="100%"
        height={300}
        imageWidth={300}
        imageHeight={300}
      />
      <Box position="absolute" top={0} right={0}>
        <Box padding={Spacing.Small} height="100%" justifyContent="flex-end" display="flex">
          <IconButton icon={MaterialIconEdit} marginRight={Spacing.ExtraSmall} />
          <IconButton icon={MaterialIconDelete} />
        </Box>
      </Box>
    </Box>
  )
}
