import React, {ReactNode, useState} from 'react'
import {Point2D} from '../molecules/imageMeta'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

/**
 *
 * Make something draggable by encapsule it with this component.
 * Make sure to use DragContainer as parent of the draggable area.
 *
 * example:
 * <DragContainer>
 *     <img src={imgSrc} width={width} height={height} />
 *     <Draggable
 *       position={focalPoint}
 *       onPositionChange={onFocalPointChange}
 *       halfSize={FocalPointSize / 2}>
 *       <FocalPoint />
 *     </Draggable>
 *   </DragContainer>
 */
export interface DraggableStyleProps {
  position: Point2D
  halfSize: number
}

const DraggableStyle = cssRuleWithTheme<DraggableStyleProps>(({position, halfSize, theme}) => ({
  position: 'absolute',
  top: pxToRem(position.y - halfSize),
  left: pxToRem(position.x - halfSize)
}))

export interface DraggableProps {
  readonly children: ReactNode
  readonly position: Point2D
  readonly halfSize: number
  onPositionChange?(newPosition: Point2D): void
}

export function Draggable({children, position, halfSize, onPositionChange}: DraggableProps) {
  const [draggingState, setDraggingState] = useState({
    relativePosition: {x: 0, y: 0},
    dragging: false
  })
  const [dragPosition, setPosition] = useState(position)

  const css = useThemeStyle({position: dragPosition, halfSize: halfSize})

  function handleStart(relativeStart: Point2D) {
    draggingState.relativePosition = relativeStart
    draggingState.dragging = true
    setDraggingState(draggingState)
  }

  function handleDrag(relativePosition: Point2D) {
    if (draggingState.dragging) {
      setPosition({
        x: dragPosition.x - (draggingState.relativePosition.x - relativePosition.x),
        y: dragPosition.y - (draggingState.relativePosition.y - relativePosition.y)
      })
      draggingState.relativePosition = relativePosition
      setDraggingState(draggingState)
    }
  }

  function handleDrop() {
    draggingState.dragging = false
    setDraggingState(draggingState)
    if (onPositionChange) {
      onPositionChange(dragPosition)
    }
  }

  return (
    <div
      className={css(DraggableStyle)}
      onMouseDown={e => handleStart({x: e.clientX, y: e.clientY})}
      onMouseMove={e => handleDrag({x: e.clientX, y: e.clientY})}
      onMouseUp={e => handleDrop()}
      onTouchStart={e => handleStart({x: e.touches[0].clientX, y: e.touches[0].clientY})}
      onTouchMove={e => handleDrag({x: e.touches[0].clientX, y: e.touches[0].clientY})}
      onTouchEnd={e => handleDrop()}>
      {children}
    </div>
  )
}
