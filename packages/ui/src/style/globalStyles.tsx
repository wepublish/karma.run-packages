import {useStaticStyle} from '@karma.run/react'
import {useContext} from 'react'
import {ThemeContext} from './themeContext'
import {FontSize, LineHeight} from './helpers'

export interface GlobalStylesProps {
  readonly rootElementID: string
}

export function GlobalStyles({rootElementID}: GlobalStylesProps) {
  const staticCSS = useStaticStyle()
  const theme = useContext(ThemeContext)

  staticCSS('html', {
    fontFamily: `'Open Sans', Arial, sans-serif`
  })

  staticCSS(`body, html, #${rootElementID}`, {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    color: theme.colors.dark
  })

  staticCSS('body', {
    fontSize: FontSize.Medium,
    lineHeight: LineHeight.Default
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
