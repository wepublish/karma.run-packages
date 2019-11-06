import React from 'react'

import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'
import {pxToRem, FontSize, BorderWidth} from '../style/helpers'
import {ReactNode} from 'react'
import {Box} from '../layout/box'

const PanelHeaderContainer = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'PanelHeader' : undefined,

    position: 'sticky',
    top: 0,

    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: pxToRem(60),
    backgroundColor: theme.colors.light,

    borderBottomStyle: 'solid',
    borderBottomWidth: BorderWidth.Small,
    borderBottomColor: theme.colors.grayLight,

    zIndex: 2
  }),
  themeMiddleware
)

const PanelHeaderTitle = styled('span', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PanelHeaderTitle' : undefined,

  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: pxToRem(FontSize.Medium),
  fontWeight: 'bold'
}))

export interface PanelHeaderProps {
  readonly title?: string
  readonly leftChildren?: ReactNode
  readonly rightChildren?: ReactNode
}

export function PanelHeader({title, leftChildren, rightChildren}: PanelHeaderProps) {
  return (
    <PanelHeaderContainer>
      {leftChildren}
      <Box flexGrow={1} />
      <PanelHeaderTitle>{title}</PanelHeaderTitle>
      {rightChildren}
    </PanelHeaderContainer>
  )
}
