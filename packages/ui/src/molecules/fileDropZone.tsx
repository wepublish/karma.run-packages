import React, {ReactNode, useState} from 'react'
import {pxToRem, FontSize} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {Icon, IconScale} from '..'
import {cssRule} from '@karma.run/react'
import {MaterialIconCloudUploadOutlined} from '@karma.run/icons'

const FileDropZoneStyle = cssRuleWithTheme<{dragging: boolean; isDisabled: boolean}>(
  ({dragging, isDisabled, theme}) => ({
    display: 'flex',
    borderRadius: pxToRem(3),
    border: dragging
      ? `1px dashed ${theme.colors.action}`
      : `1px dashed ${theme.colors.actionDark}`,
    position: 'relative',
    cursor: isDisabled ? 'not-allowed' : 'default',
    fontSize: pxToRem(FontSize.Small),
    textAlign: 'center'
  })
)

const DragOverStyle = cssRule({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
})

export interface FileDropZoneProps {
  readonly formatRestriction?: string[]
  children?: ReactNode
  readonly isDisabled?: boolean
  readonly showPlaceholder?: boolean
  onDrop(fileList: FileList): void
}

export function FileDropZone({
  formatRestriction,
  isDisabled = false,
  showPlaceholder = false,
  onDrop,
  children
}: FileDropZoneProps) {
  const [{dragging, dragCount}, setDragging] = useState({dragging: false, dragCount: 0})
  const css = useThemeStyle({dragging: dragging, isDisabled: isDisabled})

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragIn(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragging({dragging: true, dragCount: dragCount + 1})
  }

  function handleDragOut(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()

    if (dragCount - 1 == 0) {
      setDragging({dragging: false, dragCount: dragCount - 1})
    } else {
      setDragging({dragging: dragging, dragCount: dragCount - 1})
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()

    setDragging({dragging: false, dragCount: 0})

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onDrop(event.dataTransfer.files)
      event.dataTransfer.clearData()
    }
  }

  return (
    // TODO use <input type=file > ?
    <div
      className={css(FileDropZoneStyle)}
      onDrop={!isDisabled ? handleDrop : undefined}
      onDragOver={!isDisabled ? handleDrag : undefined}
      onDragEnter={!isDisabled ? handleDragIn : undefined}
      onDragLeave={!isDisabled ? handleDragOut : undefined}>
      {showPlaceholder ? (
        <div>
          <Icon element={MaterialIconCloudUploadOutlined} scale={IconScale.Double} />
          <div>{'Drop image here or click to upload'}</div>
        </div>
      ) : (
        children
      )}
      {dragging && (
        <div className={css(DragOverStyle)}>
          <Icon element={MaterialIconCloudUploadOutlined} scale={IconScale.Double} />
          <div>{'Drop here'}</div>
        </div>
      )}
    </div>
  )
}
