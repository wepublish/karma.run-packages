import React, {useState} from 'react'

import {EditorBlockActionBar} from './editorBlockActionBar'
import {FavorButtonProps} from '../atoms/favorButton'
import {cssRule, useStyle} from '@karma.run/react'

const BlockContainerStyle = cssRule(() => ({
  position: 'relative'
}))

const AccessoryBarStyle = cssRule(() => ({
  position: 'absolute',
  top: '0',
  width: '100%'
}))

export interface Image {
  src: string
  description: string
}

export interface ImagesBlockProps {
  images: Image[]
  isLead: FavorButtonProps
  onEdit(): void
}

export function ImagesBlock({images, isLead, onEdit}: ImagesBlockProps) {
  const {css} = useStyle()
  const isGallery = images.length > 1

  const [current, setCurrent] = useState(0)

  function onPrevious() {
    if (current - 1 < 0) {
      setCurrent(images.length - 1)
    } else {
      setCurrent(current - 1)
    }
  }

  function onNext() {
    if (current + 1 == images.length) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  return (
    <div className={css(BlockContainerStyle)}>
      <div className={css(AccessoryBarStyle)}>
        <EditorBlockActionBar
          onEdit={onEdit}
          isLead={isLead}
          onPrevious={isGallery ? onPrevious : undefined}
          onNext={isGallery ? onNext : undefined}
        />
      </div>
      <img src={images[current].src} />
      <div>
        {isGallery && (
          <>
            {current + 1} / {images.length}
          </>
        )}{' '}
        {images[current].description}
      </div>
    </div>
  )
}
