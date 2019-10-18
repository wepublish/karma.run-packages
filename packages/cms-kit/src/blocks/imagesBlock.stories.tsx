import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ImagesBlock} from './imagesBlock'

export default {
  component: ImagesBlock,
  title: 'Blocks|ImagesBlock',
  decorators: [centerLayoutDecorator()]
}

export const Image = () => {
  const [isFavorite, setFavorite] = useState(false)

  return (
    <ImagesBlock
      images={[{src: 'https://dummyimage.com/770x430/999/fff', description: 'bananas in pyjamas'}]}
      isLead={{
        isFavorite: isFavorite,
        onFavoriteChange: () => {
          setFavorite(!isFavorite)
        }
      }}
      onEdit={() => {}}
    />
  )
}

// export const Video = () => (
//   <ImagesBlock
//   />
// )

export const Gallery = () => {
  const [isFavorite, setFavorite] = useState(false)

  return (
    <ImagesBlock
      images={[
        {src: 'https://dummyimage.com/770x430/999/fff', description: 'bananas in pyjamas'},
        {src: 'https://dummyimage.com/770x430/999/000', description: 'kiwis in bikinis'}
      ]}
      isLead={{
        isFavorite: isFavorite,
        onFavoriteChange: () => {
          setFavorite(!isFavorite)
        }
      }}
      onEdit={() => {}}
    />
  )
}
