import React, {ReactNode} from 'react'
import {IRenderer} from 'fela'
import {StyleProvider} from '@karma.run/react'
import {GlobalStyles} from './style/globalStyles'

export enum ElementID {
  ReactRoot = 'react-root'
}

export interface CMSKitProviderProps {
  rootElementID: string
  styleRenderer: IRenderer
  children?: ReactNode
}

export function CMSKitProvider({rootElementID, styleRenderer, children}: CMSKitProviderProps) {
  return (
    <StyleProvider renderer={styleRenderer}>
      <GlobalStyles rootElementID={rootElementID} />
      {children}
    </StyleProvider>
  )
}
