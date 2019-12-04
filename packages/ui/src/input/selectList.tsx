import React, {ReactNode, LiHTMLAttributes} from 'react'
import {styled} from '@karma.run/react'

import {themeMiddleware, Theme} from '../style/themeContext'
import {FontSize, BorderRadius, ZIndex, Spacing} from '../style/helpers'

export const SelectList = styled(
  'ul',
  ({theme}) => ({
    overflow: 'auto',

    position: 'absolute',
    zIndex: ZIndex.Tooltip,

    cursor: 'pointer',
    userSelect: 'none',
    width: '100%',
    maxHeight: 300,
    margin: 0,
    padding: 0,

    fontSize: FontSize.Medium,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: BorderRadius.Small,
    borderBottomRightRadius: BorderRadius.Small,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',

    ':focus': {
      outline: 'none'
    }
  }),
  themeMiddleware
)

interface SelectListItemElementProps {
  readonly isHighlighted: boolean
  readonly theme: Theme
}

const SelectListItemElement = styled(
  'li',
  ({isHighlighted, theme}: SelectListItemElementProps) => ({
    listStyle: 'none',
    padding: `${Spacing.Tiny}px ${Spacing.ExtraSmall}px`,
    backgroundColor: isHighlighted ? theme.colors.grayLight : undefined
  }),
  themeMiddleware
)

export interface SelectListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  readonly highlighted?: boolean
  readonly children?: ReactNode
}

export function SelectListItem({highlighted = false, ...props}: SelectListItemProps) {
  return <SelectListItemElement {...props} styleProps={{isHighlighted: highlighted}} />
}
