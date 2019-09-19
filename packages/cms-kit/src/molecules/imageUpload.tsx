import React from 'react'
import {IconType, Icon, IconSize} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {pxToRem, pxToEm} from '../style/helpers'
import {FontSize} from '../style/fontSize'

export const ImageUploadStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  borderRadius: pxToRem(3),
  border: `1px dashed ${theme.colors.actionDark}`
}))

const ThumbStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess}) => ({
  opacity: inProcess ? 0.4 : 1
}))

export interface ImageUploadProps {
  readonly images: ImageUploadThumbProps[]
  readonly isProcessing: boolean
  onDeleteImage(id: string): void
}

export function ImageUpload({images, isProcessing, onDeleteImage}: ImageUploadProps) {
  const {css} = useThemeStyle({inProcess: isProcessing})

  function getState() {
    if (images.length == 0) return UploadState.Empty
    else if (isProcessing) return UploadState.InProcess
    else return UploadState.Upload
  }

  return (
    <div className={css(ImageUploadStyle)}>
      <ImageUploadIcon state={getState()} />
      {images.map(img => (
        <div className={css(ThumbStyle)}>
          <OptionButtonSmall
            disabled={isProcessing}
            icon={IconType.Close}
            onClick={() => onDeleteImage(img.id)}
          />
          <ImageUploadThumb id={img.id} src={img.src} size={img.size} name={img.name} />
        </div>
      ))}
    </div>
  )
}

/**
 *
 * upload icon and info text component
 */
const UploadInfoStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess, theme}) => ({
  color: inProcess ? theme.colors.primary : theme.colors.action,
  fill: inProcess ? theme.colors.primary : theme.colors.action,
  fontSize: pxToRem(IconSize.Default),
  textAlign: 'center'
}))

const UploadInfoLabelStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess, theme}) => ({
  fontSize: pxToRem(FontSize.Small)
}))

export enum UploadState {
  Empty,
  Upload,
  InProcess
}

export interface ImageUploadIconProps {
  state: UploadState
}

export function ImageUploadIcon({state}: ImageUploadIconProps) {
  const isInProcess = state == UploadState.InProcess
  const {css} = useThemeStyle({inProcess: isInProcess})

  function getInfoText() {
    switch (state) {
      case UploadState.Empty:
        return 'drop image here or click to upload'
      case UploadState.Upload:
        return 'upload all'
      case UploadState.InProcess:
        return 'in process'
    }
  }

  return (
    <div className={css(UploadInfoStyle)}>
      <Icon type={isInProcess ? IconType.Created : IconType.Upload} />
      <div className={css(UploadInfoLabelStyle)}>{getInfoText()}</div>
    </div>
  )
}

/**
 *
 * image thumb
 */
export interface ImageUploadThumbProps {
  readonly id: string
  readonly src: string
  readonly size: string
  readonly name: string
}

export function ImageUploadThumb({src, size, name}: ImageUploadThumbProps) {
  return (
    <div>
      <img src={src} />
      <div>{size}</div>
      <div>{name}</div>
    </div>
  )
}
