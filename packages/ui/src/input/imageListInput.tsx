import React from 'react'

import {cssRule, useStyle} from '@karma.run/react'
import {MaterialIconCloudUploadOutlined, MaterialIconDeleteOutlined} from '@karma.run/icons'

import {Icon} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {FileDropZone} from '../molecules/fileDropZone'

export interface ImageListInputProps {
  readonly images: File[]
  onChange(images: File[]): void
}

export function ImageListInput({images, onChange}: ImageListInputProps) {
  function addImages(files: File[]) {
    const newImages = files.filter(file => file.type.startsWith('image'))
    onChange(newImages)
  }

  function removeImage(idx: number) {
    const newImages = [...images]
    newImages.splice(idx, 1)
    onChange(newImages)
  }

  return (
    <>
      <FileDropZone onDrop={addImages} showPlaceholder />
      {images.map((img, idx) => (
        <div key={idx}>
          <ImageUploadThumb
            id={idx}
            src={URL.createObjectURL(img)}
            size={`${img.size}`}
            name={img.name}
            onDelete={removeImage}
          />
        </div>
      ))}
    </>
  )
}

const ImageUploadThumbStyle = cssRule({})

export interface ImageUploadThumbProps {
  readonly id: number
  readonly src: string
  readonly size?: string
  readonly name?: string
  readonly isLoading?: boolean
  onDelete(id: number): void
}

export function ImageUploadThumb({
  id,
  src,
  size,
  name,
  isLoading,
  onDelete
}: ImageUploadThumbProps) {
  const css = useStyle()
  return (
    <div className={css(ImageUploadThumbStyle)}>
      {!isLoading && (
        <OptionButtonSmall icon={MaterialIconDeleteOutlined} onClick={e => onDelete(id)} />
      )}
      {isLoading && <Icon element={MaterialIconCloudUploadOutlined} />}
      <img src={src} width={210} height={140} />
      <div>{size}</div>
      <div>{name}</div>
    </div>
  )
}
