import React from 'react'

import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {IconType} from '../atoms/icon'
import {FavorButton, FavorButtonProps} from '../atoms/favorButton'
import {BlockActionBar} from './blockActionBar'
import {MaterialIconChevronLeft, MaterialIconChevronRight, MaterialIconEdit} from '@karma.run/icons'

export interface EditorBlockActionBarProps {
  onEdit(): void
  onNext?(): void
  onPrevious?(): void
  isLead?: FavorButtonProps
}

export function EditorBlockActionBar({
  onEdit,
  isLead,
  onNext,
  onPrevious
}: EditorBlockActionBarProps) {
  return (
    <BlockActionBar
      buttonsCenter={
        <>
          {onPrevious && <OptionButtonSmall icon={MaterialIconChevronLeft} onClick={onPrevious} />}
          {onNext && <OptionButtonSmall icon={MaterialIconChevronRight} onClick={onNext} />}
        </>
      }
      buttonsRight={
        <>
          <OptionButtonSmall icon={MaterialIconEdit} onClick={onEdit} />
          {isLead && (
            <FavorButton
              isFavorite={isLead.isFavorite}
              onFavoriteChange={isLead.onFavoriteChange}
            />
          )}
        </>
      }
    />
  )
}
