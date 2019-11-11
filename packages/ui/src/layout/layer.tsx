import {styled} from '@karma.run/react'
import {ZIndex} from '../style/helpers'

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
  zIndex: ZIndex.Default,
  top: 0,
  left: 0,

  width: '100%',
  height: '100%'
}))
