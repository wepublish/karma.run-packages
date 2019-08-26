import React, {createContext, useContext, useMemo, ReactNode} from 'react'
import {createRenderer, IRenderer, combineRules} from 'fela'
import {rehydrate, render, renderToMarkup, renderToSheetList} from 'fela-dom'
import * as CSS from 'csstype'

import {ChildrenProps} from './types'

export interface CSSStyle extends CSS.Properties<string | number> {
  ':active'?: CSSStyle
  ':any-link'?: CSSStyle
  ':blank'?: CSSStyle
  ':checked'?: CSSStyle
  ':current'?: CSSStyle
  ':default'?: CSSStyle
  ':defined'?: CSSStyle
  ':dir()'?: CSSStyle
  ':disabled'?: CSSStyle
  ':drop'?: CSSStyle
  ':empty'?: CSSStyle
  ':enabled'?: CSSStyle
  ':first'?: CSSStyle
  ':first-child'?: CSSStyle
  ':first-of-type'?: CSSStyle
  ':fullscreen'?: CSSStyle
  ':future'?: CSSStyle
  ':focus'?: CSSStyle
  ':focus-visible'?: CSSStyle
  ':focus-within'?: CSSStyle
  ':has()'?: CSSStyle
  ':host'?: CSSStyle
  ':host()'?: CSSStyle
  ':host-context()'?: CSSStyle
  ':hover'?: CSSStyle
  ':indeterminate'?: CSSStyle
  ':in-range'?: CSSStyle
  ':invalid'?: CSSStyle
  ':is()'?: CSSStyle
  ':lang()'?: CSSStyle
  ':last-child'?: CSSStyle
  ':last-of-type'?: CSSStyle
  ':left'?: CSSStyle
  ':link'?: CSSStyle
  ':local-link'?: CSSStyle
  ':not()'?: CSSStyle
  ':nth-child()'?: CSSStyle
  ':nth-col()'?: CSSStyle
  ':nth-last-child()'?: CSSStyle
  ':nth-last-col()'?: CSSStyle
  ':nth-last-of-type()'?: CSSStyle
  ':nth-of-type()'?: CSSStyle
  ':only-child'?: CSSStyle
  ':only-of-type'?: CSSStyle
  ':optional'?: CSSStyle
  ':out-of-range'?: CSSStyle
  ':past'?: CSSStyle
  ':placeholder-shown'?: CSSStyle
  ':read-only'?: CSSStyle
  ':read-write'?: CSSStyle
  ':required'?: CSSStyle
  ':right'?: CSSStyle
  ':root'?: CSSStyle
  ':scope'?: CSSStyle
  ':target'?: CSSStyle
  ':target-within'?: CSSStyle
  ':user-invalid'?: CSSStyle
  ':valid'?: CSSStyle
  ':visited'?: CSSStyle
  ':where()'?: CSSStyle

  '::after'?: CSSStyle
  '::backdrop'?: CSSStyle
  '::before'?: CSSStyle
  '::cue'?: CSSStyle
  '::first-letter'?: CSSStyle
  '::first-line'?: CSSStyle
  '::grammar-error'?: CSSStyle
  '::marker'?: CSSStyle
  '::part()'?: CSSStyle
  '::placeholder'?: CSSStyle
  '::selection'?: CSSStyle
  '::slotted()'?: CSSStyle
  '::spelling-error'?: CSSStyle

  '+ *'?: CSSStyle
  '~ *'?: CSSStyle
  '> *'?: CSSStyle

  '@media screen and (min-width: 768px)'?: CSSStyle

  [selector: string]: number | string | CSSStyle | undefined
}

export type CSSRenderer = IRenderer
export type CSSRuleFn<P = {}> = (props: P, renderer: CSSRenderer) => CSSStyle

export interface StyleContextType {
  readonly renderer: CSSRenderer
}

export const StyleContext = createContext<StyleContextType | null>(null)

export interface StyleRendererProviderProps extends ChildrenProps {
  readonly renderer: CSSRenderer
}

export function StyleProvider(props: StyleRendererProviderProps) {
  const value = useMemo(() => ({renderer: props.renderer}), [props.renderer])
  return <StyleContext.Provider value={value}>{props.children}</StyleContext.Provider>
}

export function createStyleRenderer() {
  return createRenderer({
    devMode: process.env.NODE_ENV !== 'production'
  })
}

export function rehydrateStyles(renderer: CSSRenderer): void {
  rehydrate(renderer)
}

export function renderStyles(renderer: CSSRenderer): void {
  render(renderer)
}

export function renderStylesToComponents(renderer: CSSRenderer): ReactNode {
  // `(sheet as any)` is needed because typings don't include rehydration property.
  return renderToSheetList(renderer).map((sheet, index) => (
    <style
      key={index}
      type="text/css"
      data-fela-type={sheet.type}
      data-fela-rehydration={(sheet as any).rehydration}
      data-fela-support={sheet.support}
      media={sheet.media}
      dangerouslySetInnerHTML={{__html: sheet.css}}
    />
  ))
}

export function renderStylesToMarkup(renderer: CSSRenderer) {
  return renderToMarkup(renderer)
}

export function cssRule<P>(fnOrStyle: CSSRuleFn<P> | CSSStyle): CSSRuleFn<P> {
  return typeof fnOrStyle === 'function' ? fnOrStyle : () => fnOrStyle
}

export interface UseStyleResult<P> {
  staticCSS(selector: string, style: CSSStyle): void
  css(...rules: CSSRuleFn<P>[]): string
}

export function useStyle(): UseStyleResult<undefined>
export function useStyle<P>(props: P): UseStyleResult<P>
export function useStyle<P>(props?: P): UseStyleResult<P> {
  const context = useContext(StyleContext)

  if (!context) {
    throw new Error(
      "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
    )
  }

  const {renderer} = context

  return {
    staticCSS(selector: string, style: CSSStyle) {
      renderer.renderStatic(style, selector)
    },
    css(...rules: CSSRuleFn<P>[]): string {
      // `as any` is needed because there's no generic version of the rest parameter function overload
      return renderer.renderRule(combineRules(...(rules as any)), props || {})
    }
  }
}
