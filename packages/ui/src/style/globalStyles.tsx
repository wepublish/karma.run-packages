import {useStaticStyle} from '@karma.run/react'
import {useContext} from 'react'
import {ThemeContext} from './themeContext'

export interface GlobalStylesProps {
  readonly rootElementID: string
}

export function GlobalStyles({rootElementID}: GlobalStylesProps) {
  const staticCSS = useStaticStyle()
  const theme = useContext(ThemeContext)

  staticCSS('html', {
    fontFamily: `'Open Sans', Arial, sans-serif`,
    fontSize: '62.5%'
  })

  staticCSS(`body, html, #${rootElementID}`, {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    color: theme.colors.dark
  })

  staticCSS('a, a:link, a:visited, a:hover, a:active', {
    color: 'inherit',
    textDecoration: 'none'
  })

  staticCSS('*, :after, :before', {
    boxSizing: 'border-box'
  })

  return null
}
