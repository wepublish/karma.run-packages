import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FocalPointInput} from './focalPointInput'

export default {
  component: FocalPointInput,
  title: 'Input|FocalPointInput',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => {
  const [point, setPoint] = useState({x: 0.5, y: 0.5})

  return (
    <FocalPointInput
      imageURL="https://dummyimage.com/800x300/ba37ba/fff"
      imageWidth={800}
      imageHeight={300}
      maxHeight={300}
      focalPoint={point}
      onChange={setPoint}
    />
  )
}
