import {styled} from '@karma.run/react'
import {BorderWidth, BorderRadius} from '../style/helpers'
import {themeMiddleware} from '../style/themeContext'

export const Image = styled(
  'img',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Image' : undefined,

    width: '100%',
    height: '100%',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.light,
    borderStyle: 'solid',
    borderRadius: BorderRadius.Small,
    backgroundColor: theme.colors.light,
    objectFit: 'cover'
  }),
  themeMiddleware
)
