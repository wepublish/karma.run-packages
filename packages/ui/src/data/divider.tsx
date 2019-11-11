import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'

export const Divider = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Divider' : undefined,

    width: '100%',
    height: '1px',

    backgroundColor: theme.colors.grayLight
  }),
  themeMiddleware
)
