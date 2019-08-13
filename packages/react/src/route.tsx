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

export interface RouteContextState<R extends RouteInstance = RouteInstance, D = any> {
  readonly current: R | null
  readonly next: R | null
  readonly data: D | null
  readonly history: HistoryState | null
}

export const RouteContext = React.createContext<RouteContextState | null>(null)

export interface RouteDispatchContextState<R extends RouteInstance = RouteInstance, D = any> {
  dispatch: Dispatch<RouteAction<R, D>>
  push(route: R): void
}

export const RouteDispatchContext = React.createContext<RouteDispatchContextState | null>(null)

export enum RouteActionType {
  PushRoute = 'pushRoute',
  ReplaceRoute = 'replaceRoute',
  SetRouteData = 'setRouteData',
  SyncFromBrowser = 'syncFromBrowser'
}

export interface PushRouteAction<R extends RouteInstance = RouteInstance, D = any> {
  readonly type: RouteActionType.PushRoute
  readonly route: R
  readonly data?: D
}

export interface ReplaceRouteAction<R extends RouteInstance = RouteInstance, D = any> {
  readonly type: RouteActionType.ReplaceRoute
  readonly route: R
  readonly data?: D
}

export interface SetRouteDataAction<D = any> {
  readonly type: RouteActionType.SetRouteData
  readonly data?: D
}

export interface SyncFromBrowser<R extends RouteInstance = RouteInstance, D = any> {
  readonly type: RouteActionType.SyncFromBrowser
  readonly route: R
  readonly data?: D
}

export type RouteAction<R extends RouteInstance = RouteInstance, D = any> =
  | PushRouteAction<R, D>
  | ReplaceRouteAction<R, D>
  | SetRouteDataAction<D>
  | SyncFromBrowser<R, D>

export function fullPathForRoute(route: RouteInstance) {
  const queryString = new URLSearchParams(route.query).toString()
  return `${route.path}${queryString ? `?${queryString}` : ''}${route.hash ? `#${route.hash}` : ''}`
}

export function routeReducer<R extends RouteInstance = RouteInstance, D = any>(
  state: RouteContextState<R, D>,
  action: RouteAction<R>
): RouteContextState<R, D> {
  switch (action.type) {
    case RouteActionType.PushRoute:
    case RouteActionType.ReplaceRoute:
    case RouteActionType.SyncFromBrowser: {
      return {
        current: action.data ? action.route : state.current,
        next: action.data ? null : action.route,
        data: action.data || null,
        history:
          action.type !== RouteActionType.SyncFromBrowser
            ? {
                type:
                  action.type === RouteActionType.PushRoute
                    ? HistoryType.Push
                    : HistoryType.Replace,
                path: fullPathForRoute(action.route),
                data: action.data
              }
            : null
      }
    }

    case RouteActionType.SetRouteData: {
      return {
        ...state,
        current: state.next,
        next: null,
        data: action.data,
        history: state.next && {
          type: HistoryType.Replace,
          path: fullPathForRoute(state.next),
          data: action.data
        }
      }
    }
  }
}

export interface RouteProviderProps<R extends RouteInstance, D = any> extends ChildrenProps {
  readonly initialRoute?: R
  readonly initialData?: D
}

export interface CreateRouteContextResult<R extends RouteInstance = RouteInstance, D = any> {
  readonly RouteProvider: ComponentType<RouteProviderProps<R, D>>

  useRoute: () => RouteContextState<R, D>
  useRouteDispatch: () => RouteDispatchContextState<R, D>

  // pushRouteAction: (route: R, scroll?: ScrollState, data?: D) => PushRouteAction<R, D>
  // replaceRouteAction: (route: R, scroll?: ScrollState, data?: D) => ReplaceRouteAction<R, D>

  // pushPathAction: (path: string, scroll?: ScrollState, data?: D) => PushRouteAction<R, D>
  // replacePathAction: (path: string, scroll?: ScrollState, data?: D) => ReplaceRouteAction<R, D>
}

export type RouteResolveFn<R extends RouteInstance> = (url: string) => R
export type RouteDataQueryFn<R extends RouteInstance, D = any> = (
  route: R,
  callback: (data: D) => void
) => () => void

export function createRouteContext<R extends RouteInstance, D = any>(
  resolveRoute: RouteResolveFn<R>,
  queryRouteData: RouteDataQueryFn<R, D>
): CreateRouteContextResult<R, D> {
  return {
    RouteProvider({initialRoute, initialData, children}: RouteProviderProps<R, D>) {
      const [state, dispatch] = useReducer<Reducer<RouteContextState<R, D>, RouteAction>>(
        routeReducer as Reducer<RouteContextState<R, D>, RouteAction>,
        {
          current: initialData ? initialRoute || null : null,
          next: initialData ? null : initialRoute || null,
          data: initialData || null,
          history: null
        }
      )

      const push = useMemo(
        () => (route: R, data?: D) =>
          dispatch({
            type: RouteActionType.PushRoute,
            route,
            data
          }),
        [dispatch]
      )

      const dispatchState = useMemo(() => ({dispatch, push}), [push, dispatch])

      // `dispatch` function identity will not change, but for consistency's sake we still add it to
      // the dependencies array.
      useEffect(() => {
        if (!state.next) return

        const cancel = queryRouteData(state.next, (data: D) => {
          dispatch({type: RouteActionType.SetRouteData, data})
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
              window.history.replaceState(
                {scroll: {x: window.scrollX, y: window.scrollY}, data: state.data},
                '',
                window.location.href
              )

              window.history.pushState({data: state.history.data}, '', state.history.path)
              // window.scrollTo(0, 0)

              break

            case HistoryType.Replace:
              window.history.replaceState({data: state.history.data}, '', state.history.path)
              break
          }
        }
      }, [state.history])

      useEventListener(() => [
        window,
        'popstate',
        (e: PopStateEvent) => {
          dispatch({
            type: RouteActionType.SyncFromBrowser,
            route: resolveRoute(window.location.href),
            data: e.state.data
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

    useRoute(): RouteContextState<R, D> {
      const routeContext = useContext(RouteContext)

      if (!routeContext) {
        throw new Error(
          "Couldn't find a RouteContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeContext as RouteContextState<R, D>
    },

    useRouteDispatch(): RouteDispatchContextState<R, D> {
      const routeDispatchContext = useContext(RouteDispatchContext)

      if (!routeDispatchContext) {
        throw new Error(
          "Couldn't find a RouteDispatchContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeDispatchContext as RouteDispatchContextState<R, D>
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

export interface RouteInstance<T extends string = string, P extends RouteParameter[] = any> {
  type: T
  params: ObjectForParams<P>
  path: string
  query?: Record<string, string>
  hash?: string
}

export interface Route<T extends string = string, P extends RouteParameter[] = any[]> {
  readonly type: T
  readonly path: RoutePath<P>

  create(
    params: ObjectForParams<P>,
    query?: {[key: string]: string},
    hash?: string
  ): RouteInstance<T, P>

  reverse(params: ObjectForParams<P>, query?: {[key: string]: string}, hash?: string): string
  match(path: string): ObjectForParams<P> | null
}

export function route<T extends string, P extends RouteParameter[]>(
  type: T,
  path: RoutePath<P>
): Route<T, P> {
  return {
    type,
    path,

    reverse: path.reverse,
    match: path.match,

    create(params: ObjectForParams<P>, query?: {[key: string]: string}, hash?: string) {
      return {type, params, path: path.reverse(params), query, hash}
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
  [K in keyof R]: R[K] extends Route<infer T, infer P> ? RouteInstance<T, P> : never
}[number]
