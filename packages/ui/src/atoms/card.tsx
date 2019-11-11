import {ReactNode} from 'react'

import {themeMiddleware} from '../style/themeContext'
import {BorderRadius, BorderWidth} from '../style/helpers'
import {styled} from '@karma.run/react'

export interface CardProps {
  children?: ReactNode
}

export const Card = styled(
  'div',
  ({theme}) => ({
    borderStyle: 'solid',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.grayLight,
    borderRadius: BorderRadius.Small,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    width: '100%',
    height: 'inherit'
  }),
  themeMiddleware
)
