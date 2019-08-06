import React from 'react'

export interface ButtonProps {
  test: string
}

export function Button(props: ButtonProps) {
  return <div>Hello Button {props.test}</div>
}
