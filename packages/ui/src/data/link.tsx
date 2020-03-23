import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'

export const Link = styled(
  'a',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Link' : undefined,

    color: theme.colors.action,

    ':link': {
      color: theme.colors.action
    },

    ':visited': {
      color: theme.colors.action
    },

    ':hover': {
      color: theme.colors.actionDark
    },

    ':active': {
      color: theme.colors.primaryDark
    }
  }),
  themeMiddleware
)
