import React, {useContext, useReducer, useEffect, ComponentType, Dispatch, Reducer} from 'react'
import pathToRegexp, {Key} from 'path-to-regexp'

import {ChildrenProps} from './types'
import {UnionToIntersection} from './utility'
import {useEventListener} from './hooks'

export enum RouteHistoryType {
  Push = 'push',
  Replace = 'replace'
}

export enum ScrollType {
  Maintain = 'maintain',
  Top = 'top',
  Position = 'position'
}

export interface MaintainScrollData {
  type: ScrollType.Maintain
}

export interface TopScrollData {
  type: ScrollType.Top
}

export interface PositionScrollData {
  type: ScrollType.Position
  x: number
  y: number
}

export type ScrollData = MaintainScrollData | TopScrollData | PositionScrollData

export interface RouteContextState<R extends RouteInstance = RouteInstance, D = any> {
  readonly current: R | null
  readonly next: R | null
  readonly data: D | null
  readonly scroll: ScrollData
  readonly historyType: RouteHistoryType
}

export const RouteContext = React.createContext<RouteContextState | null>(null)

export type RouteDispatchContextState<R extends RouteInstance = RouteInstance, D = any> = Dispatch<
  RouteAction<R, D>
>

export const RouteDispatchContext = React.createContext<RouteDispatchContextState | null>(null)

export enum RouteActionType {
  PushRoute = 'pushRoute',
  ReplaceRoute = 'replaceRoute'
}

export interface PushRouteAction<R extends RouteInstance = RouteInstance, D = any> {
  readonly type: RouteActionType.PushRoute
  readonly route: R
  readonly scroll: ScrollData
  readonly data?: D
}

export interface ReplaceRouteAction<R extends RouteInstance = RouteInstance, D = any> {
  readonly type: RouteActionType.ReplaceRoute
  readonly route: R
  readonly scroll: ScrollData
  readonly data?: D
}

export type RouteAction<R extends RouteInstance = RouteInstance, D = any> =
  | PushRouteAction<R, D>
  | ReplaceRouteAction<R, D>

export function routeReducer<R extends RouteInstance = RouteInstance, D = any>(
  state: RouteContextState<R, D>,
  action: RouteAction<R>
): RouteContextState<R, D> {
  switch (action.type) {
    case RouteActionType.PushRoute:
      if (action.data) {
        return {
          ...state,
          historyType: RouteHistoryType.Push,
          current: action.route,
          next: null,
          scroll: action.scroll,
          data: action.data
        }
      } else {
        return {
          ...state,
          historyType: RouteHistoryType.Push,
          next: action.route,
          scroll: action.scroll
        }
      }

    case RouteActionType.ReplaceRoute:
      if (action.data) {
        return {
          ...state,
          historyType: RouteHistoryType.Replace,
          current: action.route,
          next: null,
          scroll: action.scroll,
          data: action.data
        }
      } else {
        return {...state, historyType: RouteHistoryType.Replace, next: action.route}
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

  pushRouteAction: (route: R, scroll?: ScrollData, data?: D) => PushRouteAction<R, D>
  replaceRouteAction: (route: R, scroll?: ScrollData, data?: D) => ReplaceRouteAction<R, D>

  pushPathAction: (path: string, scroll?: ScrollData, data?: D) => PushRouteAction<R, D>
  replacePathAction: (path: string, scroll?: ScrollData, data?: D) => ReplaceRouteAction<R, D>
}

export type RouteResolveFn<R extends RouteInstance> = (path: string) => R
export type RouteDataQueryFn<R extends RouteInstance, D = any> = (
  route: R,
  callback: (data: D) => void
) => () => void

export function createRouteContext<R extends RouteInstance, D = any>(
  resolveRoute: RouteResolveFn<R>,
  queryRouteData: RouteDataQueryFn<R, D>
): CreateRouteContextResult<R, D> {
  function pushRouteAction(
    route: R,
    scroll: ScrollData = {type: ScrollType.Top},
    data?: D
  ): PushRouteAction<R, D> {
    return {type: RouteActionType.PushRoute, route, scroll, data}
  }

  function replaceRouteAction(
    route: R,
    scroll: ScrollData = {type: ScrollType.Top},
    data?: D
  ): ReplaceRouteAction<R, D> {
    return {type: RouteActionType.ReplaceRoute, route, scroll, data}
  }

  function pushPathAction(
    path: string,
    scroll: ScrollData = {type: ScrollType.Top},
    data?: D
  ): PushRouteAction<R, D> {
    return {type: RouteActionType.PushRoute, route: resolveRoute(path), scroll, data}
  }

  function replacePathAction(
    path: string,
    scroll: ScrollData = {type: ScrollType.Top},
    data?: D
  ): ReplaceRouteAction<R, D> {
    return {type: RouteActionType.ReplaceRoute, route: resolveRoute(path), scroll, data}
  }

  return {
    RouteProvider(props: RouteProviderProps<R, D>) {
      const [state, dispatch] = useReducer<Reducer<RouteContextState<R, D>, RouteAction>>(
        routeReducer as Reducer<RouteContextState<R, D>, RouteAction>,
        props.initialData != null
          ? {
              current: props.initialRoute || null,
              data: props.initialData || null,
              historyType: RouteHistoryType.Replace,
              scroll: {type: ScrollType.Top},
              next: null
            }
          : {
              current: null,
              data: props.initialData || null,
              historyType: RouteHistoryType.Replace,
              scroll: {type: ScrollType.Top},
              next: props.initialRoute || null
            }
      )

      // `dispatch` function identity will not change, but for consistency's sake we still add it to
      // the dependencies array.
      useEffect(() => {
        if (!state.next) return

        const cancel = queryRouteData(state.next, (data: D) => {
          dispatch(replaceRouteAction(state.next!, {type: ScrollType.Maintain}, data))
        })

        return cancel
      }, [state.next, dispatch])

      useEffect(() => {
        if (!state.next && !state.current) {
          dispatch(replacePathAction(window.location.pathname))
          return
        }

        switch (state.historyType) {
          case RouteHistoryType.Push:
            if (state.next && state.next.path) {
              window.history.replaceState(
                {scroll: {x: window.scrollX, y: window.scrollY}, data: state.data},
                '',
                state.current && state.current.path
              )

              window.history.pushState(null, '', state.next.path)
            } else if (state.current && state.current.path) {
              window.history.pushState({data: state.data}, '', state.current!.path)
            }

            break

          case RouteHistoryType.Replace:
            if (state.next && state.next.path) {
              window.history.replaceState(null, '', state.next.path)
            } else if (state.current) {
              window.history.replaceState(state.data, '', state.current!.path)
            }
            break
        }

        switch (state.scroll.type) {
          case ScrollType.Maintain:
            break

          case ScrollType.Position:
            window.scrollTo(state.scroll.x, state.scroll.y)
            break

          case ScrollType.Top:
            window.scrollTo(0, 0)
            break
        }
      }, [state.current, state.next, state.scroll, state.data])

      useEventListener(() => [
        window,
        'popstate',
        (e: PopStateEvent) => {
          if (e.state) {
            dispatch(
              replacePathAction(
                window.location.pathname,
                e.state.scroll && {
                  type: ScrollType.Position,
                  x: e.state.scroll.x,
                  y: e.state.scroll.y
                },
                e.state.data
              )
            )
          } else {
            dispatch(replacePathAction(window.location.pathname))
          }
        }
      ])

      return (
        <RouteDispatchContext.Provider value={dispatch}>
          <RouteContext.Provider value={state}>{props.children}</RouteContext.Provider>
        </RouteDispatchContext.Provider>
      )
    },

    pushRouteAction,
    replaceRouteAction,

    pushPathAction,
    replacePathAction,

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

  // TODO: Add query
}

export interface Route<T extends string = string, P extends RouteParameter[] = any[]> {
  readonly type: T
  readonly path: RoutePath<P>

  create(params: ObjectForParams<P>): RouteInstance<T, P>
  reverse(params: ObjectForParams<P>): string
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

    create(params: ObjectForParams<P>) {
      return {type, params, path: path.reverse(params)}
    }
  }
}

export interface RoutePath<P extends RouteParameter[]> {
  readonly path: string
  readonly regexp: RegExp
  readonly keys: Key[]
  readonly params: P

  reverse(params: ObjectForParams<P>): string
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

    reverse(params: ObjectForParams<P>) {
      return toPath(params as object)
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
  path: string,
  routes: R
): UnionForRoutes<R> | null {
  for (const route of routes) {
    const match = route.match(path)

    if (match) {
      return {
        type: route.type,
        params: match,
        path
      } as UnionForRoutes<R>
    }
  }
  return null
}

export type UnionForRoutes<R extends readonly Route[]> = {
  [K in keyof R]: R[K] extends Route<infer T, infer P> ? RouteInstance<T, P> : never
}[number]
