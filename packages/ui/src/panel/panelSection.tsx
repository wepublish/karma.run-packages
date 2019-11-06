import React, {ReactNode} from 'react'

import {styled} from '@karma.run/react'

import {pxToRem, Spacing} from '../style/helpers'
import {Theme, themeMiddleware} from '../style/themeContext'

interface PanelSectionWrapperProps {
  readonly dark?: boolean
  readonly theme: Theme
}

const PanelSectionWrapper = styled(
  'div',
  ({dark = false, theme}: PanelSectionWrapperProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'PanelSection' : undefined,

    padding: pxToRem(Spacing.Small),
    color: dark ? theme.colors.white : undefined,
    backgroundColor: dark ? theme.colors.dark : undefined
  }),
  themeMiddleware
)

export interface PanelSectionProps {
  readonly dark?: boolean
  readonly children?: ReactNode
}

export function PanelSection({dark, children}: PanelSectionProps) {
  return <PanelSectionWrapper styleProps={{dark}}>{children}</PanelSectionWrapper>
}
