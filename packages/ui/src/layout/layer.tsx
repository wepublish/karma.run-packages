import {styled} from '@karma.run/react'

export const LayerContainer = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'LayerContainer' : undefined,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%'
}))

export const Layer = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Layer' : undefined,

  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}))
