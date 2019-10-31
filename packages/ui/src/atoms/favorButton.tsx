import React from 'react'

import {BaseButton} from './baseButton'
import {Icon} from './icon'
import {cssRuleWithTheme} from '../style/themeContext'
import {ButtonProps} from './baseButton'
import {TransitionDuration, pxToEm} from '../style/helpers'
import {MaterialIconStarOutlined} from '@karma.run/icons'

export interface FavorButtonStyleProps {
  isFavorite: boolean
}

export const FavorButtonStyle = cssRuleWithTheme<FavorButtonStyleProps>(({isFavorite, theme}) => ({
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  width: pxToEm(20),
  height: pxToEm(20),

  flexShrink: 0,
  flexGrow: 0,

  borderRadius: '100%',

  backgroundColor: theme.colors.white,
  border: `solid 1px ${theme.colors.grayLight}`,

  fill: isFavorite ? theme.colors.primary : theme.colors.dark,

  transition: 'background-color ease-in, border ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.primary
  },

  '&:active:enabled': {
    backgroundColor: theme.colors.primaryDark,
    fill: theme.colors.primary
  },

  '&:disabled': {
    fill: theme.colors.gray
  }
}))

export interface FavorButtonProps extends ButtonProps {
  isFavorite: boolean
  onFavoriteChange(): void
}

export function FavorButton({isFavorite, onFavoriteChange, ...rest}: FavorButtonProps) {
  return (
    <BaseButton
      {...rest}
      style={FavorButtonStyle}
      styleProps={{isFavorite: isFavorite}}
      onClick={onFavoriteChange}>
      <Icon element={MaterialIconStarOutlined} />
    </BaseButton>
  )
}
