import React, {useState} from 'react'

import {TextButton} from '../atoms/textButton'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'
import {OutlineButton} from '../atoms/outlineButton'

export interface GalleryImage {
  readonly id: string
  readonly src: string
  readonly name: string
}

export interface GalleryMakerProps {
  readonly images: GalleryImage[]
  onUpdate(images: GalleryImage[]): void
  onRemove(id: string): void
}

export function GalleryMaker({images, onUpdate, onRemove}: GalleryMakerProps): JSX.Element {
  const [imagesState, setImagesState] = useState(images)

  function moveUp(index: number) {
    let newOrder = imagesState.map((img, i) => {
      if (i == index - 1) {
        return imagesState[index]
      }
      if (i == index) {
        return imagesState[index - 1]
      }
      return img
    })

    setImagesState(newOrder)
  }

  function moveDown(index: number) {
    let newOrder = imagesState.map((img, i) => {
      if (i == index) {
        return imagesState[index + 1]
      }
      if (i == index + 1) {
        return imagesState[index]
      }
      return img
    })

    setImagesState(newOrder)
  }

  function confirmNewOrder() {
    onUpdate(imagesState)
  }

  return (
    <GalleryMakerList
      images={imagesState}
      onConfirm={confirmNewOrder}
      onRemove={onRemove}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
    />
  )
}

/**
 *
 * Gallery Maker View
 */
export const GalleryMakerStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark
}))

export interface GalleryMakerListProps {
  readonly images: GalleryImage[]
  onMoveUp(index: number): void
  onMoveDown(index: number): void
  onRemove(id: string): void
  onConfirm(): void
}

export function GalleryMakerList({
  images,
  onMoveUp,
  onMoveDown,
  onConfirm,
  onRemove
}: GalleryMakerListProps): JSX.Element {
  const {css} = useThemeStyle()
  return (
    <div className={css(GalleryMakerStyle)}>
      {images.map((image, index) => (
        <GalleryMakerItem
          key={index}
          image={image}
          onRemove={() => onRemove(image.id)}
          onMoveUp={index > 0 ? () => onMoveUp(index) : undefined}
          onMoveDown={index < images.length - 1 ? () => onMoveDown(index) : undefined}
        />
      ))}
      <OutlineButton isInvert={true} label={'Update'} onClick={() => onConfirm()} />
    </div>
  )
}

/**
 *
 *
 */
const GalleryMakerItemStyle = cssRuleWithTheme(({theme}) => ({
  paddingTop: pxToRem(Spacing.Small),
  paddingBottom: pxToRem(Spacing.Small),
  color: theme.colors.white
}))

const GalleryMakerItemDividerStyle = cssRuleWithTheme(({theme}) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.colors.white
}))

export interface GalleryImageThumb {
  readonly src: string
  readonly name: string
}

export interface GalleryMakerItemProps {
  readonly image: GalleryImageThumb
  onMoveUp?(): void
  onMoveDown?(): void
  onRemove(): void
}

export function GalleryMakerItem({image, onMoveUp, onMoveDown, onRemove}: GalleryMakerItemProps) {
  const {css} = useThemeStyle()
  return (
    <div>
      <div className={css(GalleryMakerItemStyle)}>
        <img src={image.src} />
        <div>{image.name}</div>
        <TextButton label={'Remove'} onClick={() => onRemove()} />
        <OptionButtonSmall
          title="Move Up"
          icon={IconType.ChevronUp}
          onClick={() => {
            if (onMoveUp) onMoveUp()
          }}
          disabled={onMoveUp == undefined}
        />
        <OptionButtonSmall
          title="Move Down"
          icon={IconType.ChevronDown}
          onClick={() => {
            if (onMoveDown) onMoveDown()
          }}
          disabled={onMoveDown == undefined}
        />
      </div>
      <div className={css(GalleryMakerItemDividerStyle)}></div>
    </div>
  )
}
