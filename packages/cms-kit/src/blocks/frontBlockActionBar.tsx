import React from 'react'

import {MaterialIconEdit, MaterialIconFindReplace} from '@karma.run/icons'

import {BlockActionBar} from './blockActionBar'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'

export interface FrontBlockActionBarProps {
  onEdit(): void
  onReplace(): void
}

export function FrontBlockActionBar({onEdit, onReplace}: FrontBlockActionBarProps) {
  return (
    <BlockActionBar
      buttonsRight={
        <>
          <OptionButtonSmall icon={MaterialIconEdit} onClick={onEdit} />
          <OptionButtonSmall icon={MaterialIconFindReplace} onClick={onReplace} />
        </>
      }
    />
  )
}
