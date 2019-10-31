import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PrimaryButton} from '../atoms/primaryButton'
import {ToastContainer} from './toastContainer'
import {Box} from '../layout/box'

export default {
  component: ToastContainer,
  title: 'Containers|ToastContainer'
}

export const Interactive = () => (
  <ToastContainer>
    <Box flex alignItems="">
      <PrimaryButton label={'Label'} />
    </Box>
  </ToastContainer>
)
