import React, {useRef, useState, useLayoutEffect} from 'react'

import {Icon} from '../atoms/icon'
import {pxToRem, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {MaterialIconCenterFocusStrong} from '@karma.run/icons'
import {Image} from '../data/image'
import {DraggableContainer, Draggable, Point} from '../interaction/draggable'
import {LayerContainer, Layer} from '../layout/layer'
import {Box} from '../layout/box'

export interface FocalPointInputProps {
  readonly imageURL: string
  readonly imageWidth: number
  readonly imageHeight: number
  readonly maxHeight: number

  readonly focalPoint?: Point | null
  readonly disabled?: boolean

  onChange?(point: Point): void
}

export function FocalPointInput({
  imageURL,
  imageWidth,
  imageHeight,
  maxHeight,
  focalPoint,
  disabled,
  onChange
}: FocalPointInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainer = useRef<HTMLDivElement>(null)

  const [layouted, setLayouted] = useState(false)

  useLayoutEffect(() => {
    function layout() {
      const containerWidth = containerRef.current!.clientWidth
      const imageAspectRatio = imageWidth / imageHeight

      let imageContainerWidth = containerWidth
      let imageContainerHeight = containerWidth / imageAspectRatio

      if (imageContainerHeight > maxHeight) {
        imageContainerWidth = maxHeight * imageAspectRatio
        imageContainerHeight = maxHeight
      }

      imageContainer.current!.style.width = `${imageContainerWidth}px`
      imageContainer.current!.style.height = `${imageContainerHeight}px`
    }

    function handleResize() {
      layout()
    }

    layout()
    setLayouted(true)

    // TODO: Consider using ResizeObserver
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box
      ref={containerRef}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flex>
      <Box ref={imageContainer}>
        {layouted && (
          <LayerContainer>
            <Image src={imageURL} width={imageWidth} height={imageHeight} />
            <Layer>
              <DraggableContainer>
                {focalPoint && (
                  <Draggable point={focalPoint} onChange={onChange} disabled={disabled}>
                    <FocalPoint />
                  </Draggable>
                )}
              </DraggableContainer>
            </Layer>
          </LayerContainer>
        )}
      </Box>
    </Box>
  )
}

const FocalPointStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(50),
  height: pxToRem(50),
  backgroundColor: 'rgba(0, 0, 0, 0.2)',

  borderRadius: '100%',
  border: `1px solid ${theme.colors.white}`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fill: theme.colors.white,
  fontSize: pxToRem(FontSize.Heading3),

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
}))

export function FocalPoint() {
  const css = useThemeStyle()

  return (
    <div className={css(FocalPointStyle)}>
      <Icon element={MaterialIconCenterFocusStrong} />
    </div>
  )
}
