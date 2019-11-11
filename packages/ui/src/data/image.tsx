import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'

export const Image = styled(
  'img',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Image' : undefined,

    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.light,
    objectFit: 'cover'
  }),
  themeMiddleware
)
