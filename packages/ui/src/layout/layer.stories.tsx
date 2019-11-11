import React, {useState} from 'react'
import {MaterialIconDelete, MaterialIconEdit} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {LayerContainer, Layer} from './layer'
import {Image} from '../data/image'
import {OptionButtonSmall} from '../input/buttons/optionButtonSmall'
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
      <Box height={300}>
        <Image src="https://dummyimage.com/300x300/999/fff" width={300} height={300} />
      </Box>
      <Layer>
        <Box padding={Spacing.Small} height="100%" justifyContent="flex-end" flex>
          <Box marginRight={Spacing.Tiny}>
            <OptionButtonSmall icon={MaterialIconEdit} />
          </Box>
          <Box>
            <OptionButtonSmall icon={MaterialIconDelete} />
          </Box>
        </Box>
      </Layer>
    </LayerContainer>
  )
}
