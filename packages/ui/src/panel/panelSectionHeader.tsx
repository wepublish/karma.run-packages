import React from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'
import {pxToRem, Spacing, BorderWidth, FontSize} from '../style/helpers'

const PanelSectionHeaderContainer = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'PanelSectionHeader' : undefined,

    position: 'sticky',
    top: pxToRem(60 - 1),

    paddingTop: pxToRem(Spacing.Tiny),
    paddingBottom: pxToRem(Spacing.Tiny),
    paddingLeft: pxToRem(Spacing.Small),
    paddingRight: pxToRem(Spacing.Small),

    fontSize: pxToRem(FontSize.Small),
    color: theme.colors.grayDark,
    backgroundColor: theme.colors.light,

    borderTopStyle: 'solid',
    borderTopWidth: BorderWidth.Small,
    borderTopColor: theme.colors.grayLight,

    borderBottomStyle: 'solid',
    borderBottomWidth: BorderWidth.Small,
    borderBottomColor: theme.colors.grayLight,

    zIndex: 1
  }),
  themeMiddleware
)

export interface PanelSectionHeaderProps {
  readonly title?: string
}

export function PanelSectionHeader({title}: PanelSectionHeaderProps) {
  return <PanelSectionHeaderContainer>{title}</PanelSectionHeaderContainer>
}
