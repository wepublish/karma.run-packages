import React, {ReactNode} from 'react'
import {IRenderer, createRenderer} from 'fela'
import {StyleProvider} from '@karma.run/react'
import {GlobalStyles} from './style/globalStyles'

import felaPrefixer from 'fela-plugin-prefixer'
import felaFallbackValue from 'fela-plugin-fallback-value'
import felaUnit from 'fela-plugin-unit'
import felaExpandShorthand from 'fela-plugin-expand-shorthand'

import {tabletMediaQuery, mobileMediaQuery} from './style/helpers'
import {ModalContextProvider} from './modal/modal'

export enum ElementID {
  ReactRoot = 'react-root'
}

export interface UIProviderProps {
  rootElementID: string
  styleRenderer: IRenderer
  children?: ReactNode
}

export function createStyleRenderer() {
  return createRenderer({
    devMode: process.env.NODE_ENV !== 'production',
    mediaQueryOrder: [tabletMediaQuery, mobileMediaQuery],
    plugins: [felaExpandShorthand(true), felaPrefixer(), felaFallbackValue(), felaUnit('px')]
  })
}

export function UIProvider({rootElementID, styleRenderer, children}: UIProviderProps) {
  return (
    <ModalContextProvider>
      <StyleProvider renderer={styleRenderer}>
        <GlobalStyles rootElementID={rootElementID} />
        {children}
      </StyleProvider>
    </ModalContextProvider>
  )
}
