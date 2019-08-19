import React, {
  useContext,
  useReducer,
  useEffect,
  ComponentType,
  Dispatch,
  Reducer,
  useMemo,
  AnchorHTMLAttributes,
  useCallback,
  PointerEvent
} from 'react'

import pathToRegexp, {Key} from 'path-to-regexp'

import {ChildrenProps} from './types'
import {UnionToIntersection} from './utility'
import {useEventListener} from './hooks'

export enum HistoryType {
  Push = 'push',
  Replace = 'replace'
}

export interface ScrollData {
  x: number
  y: number
}

export interface HistoryState {
  type: HistoryType
  path: string
  data?: any
  scroll?: ScrollData | null
}

export interface RouteContextState<R extends RouteInstance = RouteInstance> {
  readonly current: R | null
  readonly next: R | null
  readonly previous: R | null
  readonly history: HistoryState | null
}

export const RouteContext = React.createContext<RouteContextState | null>(null)

export type RouteDispatchContextState<R extends RouteInstance = RouteInstance> = Dispatch<
  RouteAction<R>
>

export const RouteDispatchContext = React.createContext<RouteDispatchContextState | null>(null)

export enum RouteActionType {
  PushRoute = 'pushRoute',
  ReplaceRoute = 'replaceRoute',
  SetCurrentRoute = 'setCurrentRoute',
  SyncFromBrowser = 'syncFromBrowser'
}

export interface PushRouteAction<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.PushRoute
  readonly route: R
}

export function pushRoute<R extends RouteInstance = RouteInstance>(route: R): PushRouteAction<R> {
  return {type: RouteActionType.PushRoute, route}
}

export interface ReplaceRouteAction<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.ReplaceRoute
  readonly route: R
}

export function replaceRoute<R extends RouteInstance = RouteInstance>(
  route: R
): ReplaceRouteAction<R> {
  return {type: RouteActionType.ReplaceRoute, route}
}

export interface SetCurrentRouteAction<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.SetCurrentRoute
  readonly route: R
}

export function setCurrentRoute<R extends RouteInstance = RouteInstance>(
  route: R
): SetCurrentRouteAction<R> {
  return {type: RouteActionType.SetCurrentRoute, route}
}

export interface SyncFromBrowser<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.SyncFromBrowser
  readonly route: R
}

export function syncFromBrowser<R extends RouteInstance = RouteInstance>(
  route: R
): SyncFromBrowser<R> {
  return {type: RouteActionType.SyncFromBrowser, route}
}

export type RouteAction<R extends RouteInstance = RouteInstance> =
  | PushRouteAction<R>
  | ReplaceRouteAction<R>
  | SetCurrentRouteAction<R>
  | SyncFromBrowser<R>

export function fullPathForRoute(route: RouteInstance) {
  const queryString = new URLSearchParams(route.query).toString()
  return `${route.path}${queryString ? `?${queryString}` : ''}${route.hash ? `#${route.hash}` : ''}`
}

export function routeReducer<R extends RouteInstance = RouteInstance>(
  state: RouteContextState<R>,
  action: RouteAction<R>
): RouteContextState<R> {
  switch (action.type) {
    case RouteActionType.PushRoute:
    case RouteActionType.ReplaceRoute:
      return {
        current: state.current,
        next: action.route,
        previous: state.previous,
        history: {
          type: HistoryType.Push,
          path: fullPathForRoute(action.route),
          data: action.route.data,
          scroll: action.route.scroll
        }
      }

    case RouteActionType.ReplaceRoute:
      return {
        current: state.current,
        next: action.route,
        previous: state.previous,
        history: {
          type: HistoryType.Replace,
          path: fullPathForRoute(action.route),
          data: action.route.data,
          scroll: action.route.scroll
        }
      }

    case RouteActionType.SetCurrentRoute:
      return {
        current: action.route,
        next: null,
        previous: state.current,
        history: {
          type: HistoryType.Replace,
          path: fullPathForRoute(action.route),
          data: action.route.data,
          scroll: action.route.scroll
        }
      }

    case RouteActionType.SyncFromBrowser: {
      return {
        current: state.current,
        next: action.route,
        previous: state.previous,
        history: null
      }
    }
  }
}

export interface RouteProviderProps<R extends RouteInstance> extends ChildrenProps {
  readonly initialRoute?: R | null
  readonly handleNextRoute?: HandleNextRouteFn<R>
}

export interface LinkProps<R extends RouteInstance>
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly route?: R
  readonly element?: string
}

export interface CreateRouteContextResult<R extends RouteInstance = RouteInstance> {
  readonly RouteProvider: ComponentType<RouteProviderProps<R>>
  readonly Link: ComponentType<LinkProps<R>>

  useRoute(): RouteContextState<R>
  useRouteDispatch(): RouteDispatchContextState<R>
  matchRoute(url: string): R | null
}

export type RouteResolveFn<R extends RouteInstance> = (url: string) => R
export type HandleNextRouteFn<R extends RouteInstance> = (
  route: R,
  dispatch: Dispatch<RouteAction<R>>
) => () => void

export function createRouteContext<
  T extends readonly Route[],
  R extends RouteInstancesForRoutes<T> = RouteInstancesForRoutes<T>
>(routes: T): CreateRouteContextResult<R> {
  function matchRoute(url: string): R | null {
    return matchRoutes<T, R>(url, routes)
  }

  function useRouteDispatch(): RouteDispatchContextState<R> {
    const routeDispatchContext = useContext(RouteDispatchContext)

    if (!routeDispatchContext) {
      throw new Error(
        "Couldn't find a RouteDispatchContext provider, did you forget to include RouteProvider in the component tree."
      )
    }

    return routeDispatchContext as RouteDispatchContextState<R>
  }

  function useRoute(): RouteContextState<R> {
    const routeContext = useContext(RouteContext)

    if (!routeContext) {
      throw new Error(
        "Couldn't find a RouteContext provider, did you forget to include RouteProvider in the component tree."
      )
    }

    return routeContext as RouteContextState<R>
  }

  function Link({element, route, onClick, ...rest}: LinkProps<R>) {
    const dispatch = useRouteDispatch()

    if (route) {
      const clickHandler = useCallback((e: PointerEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e)
        if (e.isDefaultPrevented()) return

        e.preventDefault()
        dispatch(pushRoute(route))
      }, [])

      return <a {...rest} href={fullPathForRoute(route)} onClick={clickHandler} />
    } else {
      return <a {...rest} />
    }
  }

  function RouteProvider({initialRoute, handleNextRoute, children}: RouteProviderProps<R>) {
    const [state, dispatch] = useReducer<Reducer<RouteContextState<R>, RouteAction>>(
      routeReducer as Reducer<RouteContextState<R>, RouteAction>,
      {
        current: initialRoute || null,
        next: null,
        previous: null,
        history: null
      }
    )

    // `dispatch` function identity will not change, but for consistency's sake we still add it to
    // the dependencies array.
    useEffect(() => {
      if (!state.next || !handleNextRoute) return
      return handleNextRoute(state.next, dispatch)
    }, [state.next, dispatch])

    // Initialize if we don't have any route setup
    useEffect(() => {
      if (!state.next && !state.current) {
        const route = matchRoute(window.location.href)

        if (!route) return

        dispatch(syncFromBrowser(route))
      }
    }, [state.next, state.current])

    // Sync state with browser.
    useEffect(() => {
      if (state.history) {
        switch (state.history.type) {
          case HistoryType.Push:
            if (state.current) {
              // Save current scroll position into state
              window.history.replaceState(
                {
                  scroll: {x: window.scrollX, y: window.scrollY},
                  data: state.current ? state.current.data : null
                },
                '',
                window.location.href
              )
            }

            window.history.pushState(
              {data: state.history.data, scroll: state.history.scroll},
              '',
              state.history.path
            )

            break

          case HistoryType.Replace:
            window.history.replaceState(
              {data: state.history.data, scroll: state.history.scroll},
              '',
              state.history.path
            )
            break
        }
      }
    }, [state.history])

    useEventListener(() => [
      window,
      'popstate',
      (e: PopStateEvent) => {
        const route = matchRoute(window.location.href)

        if (!route) return

        route.data = route.data || e.state.data
        route.scroll = e.state.scroll

        dispatch(syncFromBrowser(route))
      }
    ])

    return (
      <RouteDispatchContext.Provider value={dispatch}>
        <RouteContext.Provider value={state}>{children}</RouteContext.Provider>
      </RouteDispatchContext.Provider>
    )
  }

  return {
    Link,
    RouteProvider,
    matchRoute,
    useRouteDispatch,
    useRoute
  }
}

export enum RouteParameterType {
  Required = 'required',
  Optional = 'optional',
  ZeroOrMore = 'zeroOrMore',
  OneOrMore = 'oneOrMore',
  Regexp = 'regexp'
}

export interface RequiredRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.Required
  readonly key: K
}

export interface OptionalRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.Optional
  readonly key: K
}

export interface ZeroOrMoreRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.ZeroOrMore
  readonly key: K
}

export interface OneOrMoreRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.OneOrMore
  readonly key: K
}

export interface RegexpRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.Regexp
  readonly key: K
  readonly regexp: RegExp
}

export type RouteParameter<K extends string = string> =
  | RequiredRouteParameter<K>
  | OptionalRouteParameter<K>
  | ZeroOrMoreRouteParameter<K>
  | OneOrMoreRouteParameter<K>
  | RegexpRouteParameter<K>

function routeParamToPathParam(param: RouteParameter): string {
  switch (param.type) {
    case RouteParameterType.Required:
      return `:${param.key}`

    case RouteParameterType.Optional:
      return `:${param.key}?`

    case RouteParameterType.Regexp:
      return `:${param.key}(${param.regexp.source})`

    case RouteParameterType.ZeroOrMore:
      return `:${param.key}*`

    case RouteParameterType.OneOrMore:
      return `:${param.key}+`
  }
}

export function required<K extends string>(key: K): RequiredRouteParameter<K> {
  return {type: RouteParameterType.Required, key}
}

export function optional<K extends string>(key: K): OptionalRouteParameter<K> {
  return {type: RouteParameterType.Optional, key}
}

export function zeroOrMore<K extends string>(key: K): ZeroOrMoreRouteParameter<K> {
  return {type: RouteParameterType.ZeroOrMore, key}
}

export function oneOrMore<K extends string>(key: K): OneOrMoreRouteParameter<K> {
  return {type: RouteParameterType.OneOrMore, key}
}

export function regexp<K extends string>(key: K, regexp: RegExp): RegexpRouteParameter<K> {
  return {type: RouteParameterType.Regexp, key, regexp}
}

export interface RouteInstance<
  T extends string = string,
  P extends RouteParameter[] = any,
  D = unknown
> {
  type: T
  params: ObjectForParams<P>
  data: D

  path: string
  query?: Record<string, string>
  hash?: string
  scroll?: ScrollData | null
}

export interface Route<T extends string = string, P extends RouteParameter[] = any[], D = unknown> {
  readonly type: T
  readonly path: RoutePath<P>
  readonly defaultData: D

  create(params: ObjectForParams<P>, opts?: CreateOptions<D>): RouteInstance<T, P, D>
  reverse(params: ObjectForParams<P>, query?: {[key: string]: string}, hash?: string): string
  match(path: string): ObjectForParams<P> | null
}

export interface CreateOptions<D = unknown> {
  data?: D
  query?: {[key: string]: string}
  hash?: string
  scroll?: ScrollData | null
}

export function route<T extends string, P extends RouteParameter[], D = unknown>(
  type: T,
  path: RoutePath<P>,
  defaultData: D
): Route<T, P, D> {
  return {
    type,
    path,
    defaultData,

    reverse: path.reverse,
    match: path.match,

    create(params, {data, query, hash, scroll}: CreateOptions<D> = {}): RouteInstance<T, P, D> {
      return {
        type,
        params,
        path: path.reverse(params),
        query,
        hash,
        data: data === undefined ? defaultData : data,
        scroll: scroll === undefined ? {x: 0, y: 0} : scroll
      }
    }
  }
}

export interface RoutePath<P extends RouteParameter[]> {
  readonly path: string
  readonly regexp: RegExp
  readonly keys: Key[]
  readonly params: P

  reverse(params: ObjectForParams<P>, query?: Record<string, string>, hash?: string): string
  match(path: string): ObjectForParams<P> | null
}

export function routePath<P extends RouteParameter[]>(
  template: TemplateStringsArray,
  ...params: P
): RoutePath<P> {
  const path = template.reduce(
    (acc, path, index) =>
      `${acc}${path}${params[index] ? routeParamToPathParam(params[index]) : ''}`,
    ''
  )

  const keys: Key[] = []
  const regexp = pathToRegexp(path, keys)
  const toPath = pathToRegexp.compile(path)

  return {
    path,
    regexp,
    keys,
    params,

    reverse(params: ObjectForParams<P>, query?: Record<string, string>, hash?: string) {
      const queryString = new URLSearchParams(query).toString()
      const path = toPath(params as object)

      return `${path}${queryString ? `?${queryString}` : ''}${hash ? `#${hash}` : ''}`
    },

    match(path: string) {
      const result = regexp.exec(path)

      if (!result) return null

      return keys.reduce(
        (acc, key, i) => ({[key.name]: result[i + 1], ...acc}),
        {}
      ) as ObjectForParams<P>
    }
  }
}

export type ObjectForParams<P extends RouteParameter[]> = UnionToIntersection<
  {
    [K in keyof P]: P[K] extends
      | RequiredRouteParameter
      | RegexpRouteParameter
      | OneOrMoreRouteParameter
      ? {[PK in P[K]['key']]: string}
      : P[K] extends OptionalRouteParameter | ZeroOrMoreRouteParameter
      ? {[PK in P[K]['key']]?: string}
      : {}
  }[number]
>

export function matchRoutes<R extends readonly Route[], I extends RouteInstancesForRoutes<R>>(
  url: string | URL,
  routes: R
): I | null {
  url = url instanceof URL ? url : new URL(url)

  for (const route of routes) {
    const match = route.match(url.pathname)

    if (match) {
      const queryObj = Object.fromEntries(url.searchParams.entries())

      return {
        type: route.type,
        data: route.defaultData,
        params: match,
        query: Object.keys(queryObj).length ? queryObj : undefined,
        hash: url.hash.slice(1) || undefined,
        path: url.pathname
      } as I
    }
  }
  return null
}

export type RouteInstancesForRoutes<R extends readonly Route[]> = {
  [K in keyof R]: R[K] extends Route<infer T, infer P, infer D> ? RouteInstance<T, P, D> : never
}[number]
