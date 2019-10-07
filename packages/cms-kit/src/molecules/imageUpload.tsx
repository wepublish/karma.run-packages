import React, {useState} from 'react'

import {cssRule, useStyle} from '@karma.run/react'
import {MaterialIconCloudUploadOutlined, MaterialIconDeleteOutlined} from '@karma.run/icons'

import {ButtonBar} from '../atoms/buttonBar'
import {Icon} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {ProgressBar} from '../atoms/progressBar'
import {FileDropZone} from './fileDropZone'

enum UploadState {
  Empty = 'empty',
  ReadyToUpload = 'ready',
  Uploading = 'uploading'
}

export interface ImageUploadProps {
  // upload progress in percentage
  readonly uploadProgress?: number
  onUpload(files: File[]): void
  onUploadCancel?(): void
}

export function ImageUpload({uploadProgress, onUpload, onUploadCancel}: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([])

  function addImages(fileList: FileList) {
    let newImages = [...images]

    for (let i = 0; i < fileList.length; i++) {
      if (fileList.item(i) != null) {
        newImages.push(fileList.item(i)!)
      }
    }
    setImages(newImages)
  }

  function removeImage(idx: number) {
    let newImages = [...images]
    newImages.splice(idx, 1)
    setImages(newImages)
  }

  function removeAll() {
    setImages([])
  }

  return (
    <FileDropZone onDrop={addImages} showPlaceholder={images.length == 0}>
      {images.map((img, idx) => (
        <div key={idx}>
          <ImageUploadThumb
            id={idx}
            src={URL.createObjectURL(img)}
            size={`${img.size}`}
            name={img.name}
            onDelete={removeImage}
            isLoading={uploadProgress != undefined}
          />
        </div>
      ))}

      {images.length > 0 && (
        <div>
          {uploadProgress ? (
            <ProgressBar progress={uploadProgress} onCancel={onUploadCancel} />
          ) : (
            <ButtonBar
              cancelLabel={'Cancel'}
              onCancel={removeAll}
              confirmLabel={'Upload'}
              onConfirm={() => onUpload(images)}
            />
          )}
        </div>
      )}
    </FileDropZone>
  )
}

/**
 *
 * Image Upload Thumb
 */
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
  const {css} = useStyle()
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
