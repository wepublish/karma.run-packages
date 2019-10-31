import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {EditorBlockActionBar} from './editorBlockActionBar'

export default {
  component: EditorBlockActionBar,
  title: 'Blocks|Interactivty/EditorBlockActionBar',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => <EditorBlockActionBar onEdit={() => {}} />

export const Favor = () => {
  const [isFavorite, setFavorite] = useState(false)
  return (
    <EditorBlockActionBar
      onEdit={() => {}}
      isLead={{
        isFavorite: isFavorite,
        onFavoriteChange: () => {
          setFavorite(!isFavorite)
        }
      }}
    />
  )
}

export const Slideshow = () => (
  <EditorBlockActionBar onEdit={() => {}} onPrevious={() => {}} onNext={() => {}} />
)
