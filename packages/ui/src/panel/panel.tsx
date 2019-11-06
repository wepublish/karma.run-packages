import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'

export const Panel = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Panel' : undefined,

    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    backgroundColor: theme.colors.white
  }),
  themeMiddleware
)
