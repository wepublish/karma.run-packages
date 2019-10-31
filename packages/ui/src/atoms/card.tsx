import {ReactNode, useContext} from 'react'

import {ThemeContext} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'
import {styled} from '@karma.run/react'

export interface CardProps {
  children?: ReactNode
}

export const Card = styled(
  'div',
  ({theme}) => ({
    border: `solid 1px ${theme.colors.grayLight}`,
    borderRadius: pxToRem(8),
    backgroundColor: theme.colors.white,
    padding: pxToRem(Spacing.ExtraSmall),
    width: '100%'
  }),
  () => ({
    theme: useContext(ThemeContext)
  })
)
