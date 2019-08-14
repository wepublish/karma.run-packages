import React, {
  useContext,
  useReducer,
  useEffect,
  ComponentType,
  Dispatch,
  Reducer,
  useMemo
} from 'react'

import pathToRegexp, {Key} from 'path-to-regexp'

import {ChildrenProps} from './types'
import {UnionToIntersection} from './utility'
import {useEventListener} from './hooks'

export enum HistoryType {
  Push = 'push',
  Replace = 'replace'
}

export enum ScrollType {
  Top = 'top',
  Position = 'position',
  Maintain = 'maintain'
}

export interface MaintainScrollState {
  type: ScrollType.Maintain
}

export interface TopScrollState {
  type: ScrollType.Top
}

export interface PositionScrollState {
  type: ScrollType.Position
  x: number
  y: number
}

export type ScrollState = MaintainScrollState | TopScrollState | PositionScrollState

export interface HistoryState {
  type: HistoryType
  path: string
  data?: any
}

export interface BrowserState {
  history: HistoryState | null
  scroll: ScrollState | null
}

export interface RouteContextState<R extends RouteInstance = RouteInstance> {
  readonly current: R | null
  readonly next: R | null
  readonly history: HistoryState | null
}

export const RouteContext = React.createContext<RouteContextState | null>(null)

export interface RouteDispatchContextState<R extends RouteInstance = RouteInstance> {
  dispatch: Dispatch<RouteAction<R>>
  push(route: R): void
}

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

export interface ReplaceRouteAction<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.ReplaceRoute
  readonly route: R
}

export interface SetCurrentRouteAction<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.SetCurrentRoute
  readonly route: R
}

export interface SyncFromBrowser<R extends RouteInstance = RouteInstance> {
  readonly type: RouteActionType.SyncFromBrowser
  readonly route: R
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
        history: {
          type: HistoryType.Push,
          path: fullPathForRoute(action.route),
          data: action.route.data
        }
      }

    case RouteActionType.ReplaceRoute:
      return {
        current: state.current,
        next: action.route,
        history: {
          type: HistoryType.Replace,
          path: fullPathForRoute(action.route),
          data: action.route.data
        }
      }

    case RouteActionType.SetCurrentRoute:
      return {
        current: action.route,
        next: null,
        history: {
          type: HistoryType.Replace,
          path: fullPathForRoute(action.route),
          data: action.route.data
        }
      }

    case RouteActionType.SyncFromBrowser: {
      return {
        current: null,
        next: action.route,
        history: null
      }
    }
  }
}

export interface RouteProviderProps<R extends RouteInstance> extends ChildrenProps {
  readonly initialRoute?: R
}

export interface CreateRouteContextResult<R extends RouteInstance = RouteInstance> {
  readonly RouteProvider: ComponentType<RouteProviderProps<R>>

  useRoute: () => RouteContextState<R>
  useRouteDispatch: () => RouteDispatchContextState<R>
}

export type RouteResolveFn<R extends RouteInstance> = (url: string) => R
export type HandleNextRouteFn<R extends RouteInstance> = (
  route: R,
  callback: (newRoute: R) => void
) => () => void

export function createRouteContext<R extends RouteInstance>(
  resolveRoute: RouteResolveFn<R>,
  handleNextRoute: HandleNextRouteFn<R>
): CreateRouteContextResult<R> {
  return {
    RouteProvider({initialRoute, children}: RouteProviderProps<R>) {
      const [state, dispatch] = useReducer<Reducer<RouteContextState<R>, RouteAction>>(
        routeReducer as Reducer<RouteContextState<R>, RouteAction>,
        {
          current: null,
          next: initialRoute || null,
          history: null
        }
      )

      const push = useMemo(
        () => (route: R) =>
          dispatch({
            type: RouteActionType.PushRoute,
            route
          }),
        [dispatch]
      )

      const dispatchState = useMemo(() => ({dispatch, push}), [push, dispatch])

      // `dispatch` function identity will not change, but for consistency's sake we still add it to
      // the dependencies array.
      useEffect(() => {
        if (!state.next) return

        const cancel = handleNextRoute(state.next, (newRoute: R) => {
          dispatch({type: RouteActionType.SetCurrentRoute, route: newRoute})
        })

        return cancel
      }, [state.next, dispatch])

      // Initialize if we don't have any route setup
      useEffect(() => {
        if (!state.next && !state.current) {
          dispatch({
            type: RouteActionType.SyncFromBrowser,
            route: resolveRoute(window.location.href)
          })
        }
      }, [state.next, state.current])

      // Sync state with browser.
      useEffect(() => {
        if ('scrollRestoration' in history && history.scrollRestoration !== 'manual') {
          history.scrollRestoration = 'manual'
        }

        if (state.history) {
          switch (state.history.type) {
            case HistoryType.Push:
              // window.history.replaceState(
              //   {scroll: {x: window.scrollX, y: window.scrollY}, data: state.cu},
              //   '',
              //   window.location.href
              // )

              window.history.pushState({data: state.history.data}, '', state.history.path)
              // window.scrollTo(0, 0)

              break

            case HistoryType.Replace:
              console.log(state.history.data)
              window.history.replaceState({data: state.history.data}, '', state.history.path)
              break
          }
        }
      }, [state.history])

      useEventListener(() => [
        window,
        'popstate',
        (e: PopStateEvent) => {
          const route = resolveRoute(window.location.href)

          route.data = e.state.data

          dispatch({
            type: RouteActionType.SyncFromBrowser,
            route
          })

          if (e.state.scroll) {
            // window.scrollTo(e.state.scroll.x, e.state.scroll.y)
          } else {
            // window.scrollTo(0, 0)
          }
        }
      ])

      return (
        <RouteDispatchContext.Provider value={dispatchState}>
          <RouteContext.Provider value={state}>{children}</RouteContext.Provider>
        </RouteDispatchContext.Provider>
      )
    },

    useRoute(): RouteContextState<R> {
      const routeContext = useContext(RouteContext)

      if (!routeContext) {
        throw new Error(
          "Couldn't find a RouteContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeContext as RouteContextState<R>
    },

    useRouteDispatch(): RouteDispatchContextState<R> {
      const routeDispatchContext = useContext(RouteDispatchContext)

      if (!routeDispatchContext) {
        throw new Error(
          "Couldn't find a RouteDispatchContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeDispatchContext as RouteDispatchContextState<R>
    }
  }
}

export enum RouteParameterType {
  Required = 'required',
  Optional = 'optional',
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

export interface RegexpRouteParameter<K extends string = string> {
  readonly type: RouteParameterType.Regexp
  readonly key: K
  readonly regexp: RegExp
}

export type RouteParameter<K extends string = string> =
  | RequiredRouteParameter<K>
  | OptionalRouteParameter<K>
  | RegexpRouteParameter<K>

function routeParamToPathParam(param: RouteParameter) {
  switch (param.type) {
    case RouteParameterType.Required:
      return `:${param.key}`

    case RouteParameterType.Optional:
      return `:${param.key}`

    case RouteParameterType.Regexp:
      return `:${param.key}?`
  }
}

export function required<K extends string>(key: K): RequiredRouteParameter<K> {
  return {type: RouteParameterType.Required, key}
}

export function optional<K extends string>(key: K): OptionalRouteParameter<K> {
  return {type: RouteParameterType.Optional, key}
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
  path: string
  query?: Record<string, string>
  hash?: string
  data?: D
}

export interface Route<T extends string = string, P extends RouteParameter[] = any[], D = unknown> {
  readonly type: T
  readonly path: RoutePath<P>
  readonly defaultData: D

  create(
    params: ObjectForParams<P>,
    data?: D,
    query?: {[key: string]: string},
    hash?: string
  ): RouteInstance<T, P, D>

  reverse(params: ObjectForParams<P>, query?: {[key: string]: string}, hash?: string): string
  match(path: string): ObjectForParams<P> | null
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

    create(
      params: ObjectForParams<P>,
      data: D = defaultData,
      query?: {[key: string]: string},
      hash?: string
    ) {
      return {type, params, path: path.reverse(params), query, hash, data}
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
    [K in keyof P]: P[K] extends RequiredRouteParameter | RegexpRouteParameter
      ? {[PK in P[K]['key']]: string}
      : P[K] extends OptionalRouteParameter
      ? {[PK in P[K]['key']]?: string}
      : {}
  }[number]
>

export function resolveRoutes<R extends readonly Route[]>(
  url: string | URL,
  routes: R
): UnionForRoutes<R> | null {
  url = url instanceof URL ? url : new URL(url)

  for (const route of routes) {
    const match = route.match(url.pathname)

    if (match) {
      const queryObj = Object.fromEntries(url.searchParams.entries())

      return {
        type: route.type,
        params: match,
        query: Object.keys(queryObj).length ? queryObj : undefined,
        hash: url.hash.slice(1) || undefined,
        path: url.pathname
      } as UnionForRoutes<R>
    }
  }
  return null
}

export type UnionForRoutes<R extends readonly Route[]> = {
  [K in keyof R]: R[K] extends Route<infer T, infer P, infer D> ? RouteInstance<T, P, D> : never
}[number]
