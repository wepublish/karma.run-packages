import {useStyle} from '@karma.run/react'

export interface GlobalStylesProps {
  readonly rootElementID: string
}

export function GlobalStyles({rootElementID}: GlobalStylesProps) {
  const {staticCSS} = useStyle()

  staticCSS('html', {
    fontFamily: `'Open Sans', Arial, sans-serif`,
    fontSize: '62.5%'
  })

  staticCSS(`body, html, #${rootElementID}`, {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
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
