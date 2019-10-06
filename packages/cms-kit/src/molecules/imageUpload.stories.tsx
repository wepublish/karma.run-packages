import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ImageUpload, ImageUploadThumb} from './imageUpload'

export default {
  component: ImageUpload,
  title: 'Molecules|ImagesUpload',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => {
  return <ImageUpload onUpload={() => {}} />
}

export const Uploading = () => {
  return <ImageUpload onUpload={() => {}} uploadProgress={60} />
}

export const ImageThumb = () => {
  return (
    <ImageUploadThumb
      id={mockThumbImage.id}
      src={mockThumbImage.src}
      name={mockThumbImage.name}
      size={mockThumbImage.size}
      onDelete={() => {}}
    />
  )
}

export const ImageThumbUploading = () => {
  return (
    <ImageUploadThumb
      id={mockThumbImage.id}
      src={mockThumbImage.src}
      name={mockThumbImage.name}
      size={mockThumbImage.size}
      isLoading={true}
      onDelete={() => {}}
    />
  )
}

const mockThumbImage = {
  id: 0,
  src: 'https://dummyimage.com/100x68/000/fff',
  size: '1.1MB',
  name: 'Banana.jpg'
}
