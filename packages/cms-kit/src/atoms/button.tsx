import React from 'react'
import {useStyle, cssRule} from '@karma.run/react'

export interface ButtonProps {
  test: string
}

const buttonStyle = cssRule(() => ({
  backgroundColor: 'red',
  margin: '0 0 0 0',

  '&:hover': {
    backgroundColor: 'blue'
  }
}))

export function Button(props: ButtonProps) {
  const {css} = useStyle('Button')
  return <div className={css(buttonStyle)}>Test</div>
}
