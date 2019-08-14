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

export interface HistoryState {
  type: HistoryType
  path: string
  data?: any
  scroll?: {x: number; y: number}
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
  dispatch: Dispatch<RouteAction<R>>
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
          previous: null,
          history: null
        }
      )

      // `dispatch` function identity will not change, but for consistency's sake we still add it to
      // the dependencies array.
      useEffect(() => {
        if (!state.next) return
        return handleNextRoute(state.next, dispatch)
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
          const route = resolveRoute(window.location.href)

          route.data = e.state.data
          route.scroll = e.state.scroll

          dispatch({
            type: RouteActionType.SyncFromBrowser,
            route
          })
        }
      ])

      return (
        <RouteDispatchContext.Provider value={dispatch}>
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
  data: D

  path: string
  query?: Record<string, string>
  hash?: string
  scroll?: {x: number; y: number}
}

export interface Route<T extends string = string, P extends RouteParameter[] = any[], D = unknown> {
  readonly type: T
  readonly path: RoutePath<P>
  readonly defaultData: D

  create(args: CreateParams<P, D>): RouteInstance<T, P, D>
  reverse(params: ObjectForParams<P>, query?: {[key: string]: string}, hash?: string): string
  match(path: string): ObjectForParams<P> | null
}

export interface CreateParams<P extends RouteParameter[] = any[], D = unknown> {
  params: ObjectForParams<P>
  data?: D
  query?: {[key: string]: string}
  hash?: string
  scroll?: {x: number; y: number}
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

    create({params, data, query, hash, scroll}: CreateParams<P, D>) {
      return {
        type,
        params,
        path: path.reverse(params),
        query,
        hash,
        data: data !== undefined ? data : defaultData,
        scroll
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
        data: route.defaultData,
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
