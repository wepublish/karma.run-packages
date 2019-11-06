import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ImageListInput} from './imageListInput'

export default {
  component: ImageListInput,
  title: 'Input|ImageListInput',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Interactive = () => {
  const [images, setImages] = useState<File[]>([])
  return <ImageListInput images={images} onChange={setImages} />
}
