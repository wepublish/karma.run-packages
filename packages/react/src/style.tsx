import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  forwardRef,
  DetailedHTMLProps,
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react'

import {IRenderer, combineRules} from 'fela'
import {renderToMarkup, renderToSheetList} from 'fela-dom'
import {PropertiesFallback} from 'csstype'

export interface CSSStyle extends PropertiesFallback<string | number> {
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

  [selector: string]: number | string | CSSStyle | undefined | (string | number)[]
}

export type CSSRenderer = IRenderer
export type CSSRule<P extends {} = {}> = (props: P, renderer: CSSRenderer) => CSSStyle
export type CSSKeyframes<P extends {} = {}> = (
  props: P,
  renderer: CSSRenderer
) => Record<string, CSSStyle>

export interface StyleContextType {
  readonly renderer: CSSRenderer
}

export const StyleContext = createContext<StyleContextType | null>(null)

export interface StyleRendererProviderProps {
  readonly renderer: CSSRenderer
  readonly children?: ReactNode
}

export function StyleProvider(props: StyleRendererProviderProps) {
  const value = useMemo(() => ({renderer: props.renderer}), [props.renderer])
  return <StyleContext.Provider value={value}>{props.children}</StyleContext.Provider>
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

export function cssRule<P = unknown>(fnOrStyle: CSSRule<P> | CSSStyle): CSSRule<P> {
  return typeof fnOrStyle === 'function' ? fnOrStyle : () => fnOrStyle
}

export function cssKeyframes<P = {}>(keyframesRuleFn: CSSKeyframes<P>): CSSKeyframes<P> {
  return keyframesRuleFn
}

export interface CSSFontProps {
  fontDisplay?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  fontVariant?: string
  fontWeight?: string
  fontStretch?: string
  fontStyle?: string
  unicodeRange?: string
}

export function useStaticStyle<P = unknown>(): (selector: string, style: CSSStyle) => void {
  const context = useContext(StyleContext)

  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      throw new Error(
        "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
      )
    }
  }

  const {renderer} = context!

  return (selector: string, style: CSSStyle) => {
    renderer.renderStatic(style as any, selector)
  }
}

export function useStyle<P = unknown>(): (...rules: CSSRule<P>[]) => string
export function useStyle<P>(props: P): (...rules: CSSRule<P>[]) => string
export function useStyle<P>(props?: P): (...rules: CSSRule<P>[]) => string {
  const context = useContext(StyleContext)

  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      throw new Error(
        "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
      )
    }
  }

  const {renderer} = context!

  return (...rules: CSSRule<P>[]) => {
    // `as any` is needed because there's no generic version of the rest parameter function overload
    return renderer.renderRule(combineRules(...(rules as any)), props as any)
  }
}

export function useFont<P = unknown>(): (
  family: string,
  files: string | string[],
  fontProps?: CSSFontProps
) => void
export function useFont<P>(
  props: P
): (family: string, files: string | string[], fontProps?: CSSFontProps) => void
export function useFont<P>(
  props?: P
): (family: string, files: string | string[], fontProps?: CSSFontProps) => void {
  const context = useContext(StyleContext)

  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      throw new Error(
        "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
      )
    }
  }

  const {renderer} = context!

  return (family: string, files: string | string[], fontProps?: CSSFontProps) => {
    renderer.renderFont(family, Array.isArray(files) ? files : [files], fontProps)
  }
}

export function useStyleRenderer(): IRenderer {
  const context = useContext(StyleContext)

  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      throw new Error(
        "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
      )
    }
  }

  const {renderer} = context!
  return renderer
}

export type StylePropsFromProps<P extends {}> = keyof P extends never
  ? {styleProps?: P}
  : {styleProps: P}

export type RefTypeForElement<
  E extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[E] extends DetailedHTMLProps<infer _, infer T> ? T : never

export interface StyledProps<P extends {}, SP extends {} = {}> {
  styleRules: CSSRule<SP>[]
  styleProps: P & SP
}

export function styled<
  E extends keyof JSX.IntrinsicElements,
  MP extends {} = {},
  SP extends {} = MP
>(
  element: E,
  rule: CSSRule<SP>,
  middleware?: () => MP
): ForwardRefExoticComponent<
  PropsWithoutRef<Omit<JSX.IntrinsicElements[E], 'className'>> &
    RefAttributes<RefTypeForElement<E>> &
    StylePropsFromProps<Omit<SP, keyof MP>>
>
export function styled<P extends {className?: string}, MP extends {} = {}, SP extends {} = MP>(
  element: ComponentType<P>,
  rule: CSSRule<SP>,
  middleware?: () => MP
): ForwardRefExoticComponent<
  PropsWithoutRef<Omit<P, 'className'>> &
    RefAttributes<any> &
    StylePropsFromProps<Omit<SP, keyof MP>>
>
export function styled(
  Element: any,
  rule: (props: any, renderer: CSSRenderer) => any,
  middleware?: () => any
): ForwardRefExoticComponent<any> {
  const forwardedRef = forwardRef<any, {styleRules: any; styleProps: any}>(
    ({styleProps, ...props}, ref) => {
      const context = useContext(StyleContext)

      if (process.env.NODE_ENV !== 'production') {
        if (!context) {
          throw new Error(
            "Couldn't find a StyleContext provider, did you forget to include StyleProvider in the component tree."
          )
        }
      }

      const {renderer} = context!
      const stylePropsWithMiddleware = middleware
        ? Object.assign({}, styleProps, middleware())
        : styleProps ?? {}

      return (
        <Element
          ref={ref}
          {...props}
          className={renderer.renderRule(rule, stylePropsWithMiddleware)}
        />
      )
    }
  )

  const displayName = typeof Element === 'string' ? Element : Element.displayName || Element.name
  forwardedRef.displayName = `Styled(${displayName})`

  return forwardedRef
}
