import React from 'react'

import {Icon, IconScale} from '../atoms/icon'
import {pxToRem} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {Spacing} from '../style/helpers'
import {Draggable} from '../atoms/draggable'
import {DragContainer} from '../atoms/dragContainer'
import {MaterialIconCenterFocusStrong} from '@karma.run/icons'
import {DescriptionListing, DescriptionListingItem} from '../atoms/descriptionListingItem'

const ImageMetaStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark,
  padding: pxToRem(Spacing.Small),

  '> dl dt': {
    color: theme.colors.light
  },

  '> dl dd': {
    color: theme.colors.white
  }
}))

export type File = {
  src: string
  name: string
  width: number
  height: number
  date: string
  size: number
  link: string
}

export interface ImageMetaProps {
  readonly file: File
}

export function ImageMeta({file}: ImageMetaProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(ImageMetaStyle)}>
      <FocalPointSetter imgSrc={file.src} width={file.width} height={file.height} />
      <DescriptionListing>
        <DescriptionListingItem label={'File name'} value={file.name} />
        <DescriptionListingItem label={'Dimensions'} value={`${file.width} x ${file.height} px`} />
        <DescriptionListingItem label={'Upload date'} value={file.date} />
        <DescriptionListingItem label={'File size'} value={`${file.size} MB`} />
        <DescriptionListingItem label={'Link'} value={file.link} />
      </DescriptionListing>
    </div>
  )
}

/**
 *
 * Focal Point Setter
 */
export type Point2D = {x: number; y: number}

export interface FocalPointSetterProps {
  imgSrc: string
  width?: number
  height?: number
  focalPoint?: Point2D
  onFocalPointChange?(newPost: Point2D): void
}

export function FocalPointSetter({
  imgSrc,
  width,
  height,
  focalPoint = {x: 440 / 2, y: 290 / 2},
  onFocalPointChange
}: FocalPointSetterProps) {
  const {css} = useThemeStyle()

  return (
    <DragContainer>
      <img src={imgSrc} width={width} height={height} />
      <Draggable
        position={focalPoint}
        onPositionChange={onFocalPointChange}
        halfSize={FocalPointSize / 2}>
        <FocalPoint />
      </Draggable>
    </DragContainer>
  )
}

/**
 *
 * Focal Point Icon
 */
export const FocalPointSize = 50
const FocalPointStyle = cssRuleWithTheme(({theme}) => ({
  cursor: 'pointer',

  width: pxToRem(FocalPointSize),
  height: pxToRem(FocalPointSize),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },

  borderRadius: '100%',
  border: `1px solid ${theme.colors.white}`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fill: theme.colors.white,
  fontSize: IconScale.Double
}))

export interface FocalPointProps {}

export function FocalPoint({}: FocalPointProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(FocalPointStyle)}>
      <Icon element={MaterialIconCenterFocusStrong} />
    </div>
  )
}
