import React from 'react'
import {styled} from '@karma.run/react'

import {IconElement} from './icon'
import {Image} from './image'
import {IconButton} from '../buttons/iconButton'

import {themeMiddleware, Theme} from '../style/themeContext'
import {FontSize, Spacing, BorderRadius, BorderWidth, MarginProps} from '../style/helpers'

interface ChipElementProps extends MarginProps {
  readonly theme: Theme
}

const ChipElement = styled(
  'div',
  ({theme, ...props}: ChipElementProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'fill',
    flexDirection: 'row',
    flexShrink: 0,
    overflow: 'hidden',

    fontSize: FontSize.Small,
    color: theme.colors.dark,

    borderRadius: BorderRadius.Tiny,
    borderWidth: BorderWidth.Small,
    borderStyle: 'solid',
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.light,

    ...props
  }),
  themeMiddleware
)

const ChipLabel = styled('span', () => ({
  padding: `${Spacing.Tiny} ${Spacing.ExtraSmall}`
}))

export interface ChipProps extends MarginProps {
  readonly label: string
  readonly imageURL?: string
  readonly icon?: IconElement
  readonly onIconClick?: () => void
}

export function Chip({label, imageURL, icon, onIconClick, ...props}: ChipProps) {
  return (
    <ChipElement styleProps={props}>
      {imageURL && <Image src={imageURL} width={26} alignSelf="stretch" />}
      <ChipLabel>{label}</ChipLabel>
      {icon && (
        <IconButton
          icon={icon}
          variant="light"
          marginLeft={-Spacing.Tiny}
          onClick={() => onIconClick?.()}
        />
      )}
    </ChipElement>
  )
}
