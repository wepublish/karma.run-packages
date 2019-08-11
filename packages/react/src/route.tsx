import React, {useContext, useReducer, useEffect, ComponentType, Dispatch} from 'react'

import {ChildrenProps} from './types'
import {useEventListener} from './hooks'

export interface RouteContextState<T = any> {
  readonly current: T
  readonly next: string | null
}

export const RouteContext = React.createContext<RouteContextState | null>(null)

export type RouteDispatchContextState<T = any> = Dispatch<RouteAction<T>>
export const RouteDispatchContext = React.createContext<RouteDispatchContextState | null>(null)

export enum RouteActionType {
  PushPath = 'pushPath',
  PushRoute = 'pushRoute'
}

export interface PushPathAction {
  readonly type: RouteActionType.PushPath
  readonly path: string
}

export interface PushRouteAction<T = any> {
  readonly type: RouteActionType.PushRoute
  readonly route: T
}

export type RouteAction<T = any> = PushPathAction | PushRouteAction<T>

export function routeReducer(state: RouteContextState, action: RouteAction): RouteContextState {
  switch (action.type) {
    case RouteActionType.PushPath:
      return {...state, next: action.path}

    case RouteActionType.PushRoute:
      return {...state, current: action.route, next: null}
  }
}

export interface RouteProviderProps<T = any> extends ChildrenProps {
  readonly initialRoute: T
  // queryRouteData(route: Route<keyof M>): M[keyof M]
}

export interface CreateRouteContextResult<T> {
  readonly RouteProvider: ComponentType<RouteProviderProps<T>>

  useRoute: () => T
  useRouteDispatch: () => RouteDispatchContextState<T>
  pushRouteAction: (route: T) => PushRouteAction<T>
  pushPathAction: (path: string) => PushPathAction
}

export type RouteReverseFn<T> = (route: T) => string
export type RouteDataQueryFn<T> = (path: string, callback: (data: T) => void) => () => void

export function createRouteContext<T>(
  reverseRoute: RouteReverseFn<T>,
  queryRoute: RouteDataQueryFn<T>
): CreateRouteContextResult<T> {
  function pushRouteAction(route: T): PushRouteAction<T> {
    return {type: RouteActionType.PushRoute, route}
  }

  function pushPathAction(path: string): PushPathAction {
    return {type: RouteActionType.PushPath, path}
  }

  return {
    RouteProvider(props: RouteProviderProps) {
      const [state, dispatch] = useReducer(routeReducer, {
        current: props.initialRoute,
        next: null
      })

      // `dispatch` function identity will not change, but for consistency's sake we still add it to
      // the dependencies array.
      useEffect(() => {
        if (!state.next) return

        const cancel = queryRoute(state.next, () => {})
        return cancel
      }, [state.next, dispatch])

      useEffect(() => {
        const path = reverseRoute(state.current)

        if (window.location.pathname !== path) {
          window.history.pushState(state.current, '', path)
        } else {
          window.history.replaceState(state.current, '', path)
        }
      }, [state.current])

      useEventListener(() => [
        window,
        'popstate',
        (e: PopStateEvent) => {
          if (e.state) {
            dispatch(pushRouteAction(e.state))
          } else {
            dispatch(pushPathAction(window.location.pathname))
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
    pushPathAction,

    useRoute(): T {
      const routeContext = useContext(RouteContext)

      if (!routeContext) {
        throw new Error(
          "Couldn't find a RouteContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeContext.current
    },

    useRouteDispatch(): RouteDispatchContextState<T> {
      const routeDispatchContext = useContext(RouteDispatchContext)

      if (!routeDispatchContext) {
        throw new Error(
          "Couldn't find a RouteDispatchContext provider, did you forget to include RouteProvider in the component tree."
        )
      }

      return routeDispatchContext
    }
  }
}

export interface RoutePath<K extends string = string> {
  readonly templatePath: string
  readonly reverse: (params: {[T in K]: string}) => string
}

export interface RouteInstance<
  T extends string | number | symbol = string,
  K extends string = string,
  D = any
> {
  type: T
  params: {[T in K]: string}
  path: string
  data?: D
}

export enum RouteParameterType {
  Named = 'named',
  NamedRegex = 'namedRegex'
}

export type RouteParameter<K extends string = string> =
  | {
      readonly type: RouteParameterType.Named
      readonly key: K
    }
  | {
      readonly type: RouteParameterType.NamedRegex
      readonly key: K
      readonly regexp: RegExp
    }

function routeParamToPathParam(param: RouteParameter) {
  switch (param.type) {
    case RouteParameterType.Named:
      return `:${param.key}`

    case RouteParameterType.NamedRegex:
      return `:${param.key}(${param.regexp.source})`
  }
}

export function param<T extends string>(key: T): RouteParameter<T> {
  return {type: RouteParameterType.Named, key}
}

export function routePath<K extends string>(
  template: TemplateStringsArray,
  ...params: [...RouteParameter<K>[]]
): RoutePath<K> {
  return {
    templatePath: template.reduce(
      (acc, path, index) =>
        `${acc}${path}${params[index] ? routeParamToPathParam(params[index]) : ''}`,
      ''
    ),
    reverse: p => {
      return template.reduce(
        (acc, path, index) => `${acc}${path}${params[index] ? p[params[index].key] || '' : ''}`,
        ''
      )
    }
  }
}

export type RouteHandler<P extends {}, D> = [Route<P>, (params: P) => Promise<D>]

export function matchRoute<D>(routeHandlers: RouteHandler<any, D>[]) {}

export function routeHandler<P extends {}, D>(
  route: Route<P>,
  handler: (params: P) => Promise<D>
): RouteHandler<P, D> {
  return [route, handler]
}

export interface Route<P extends {}> {
  (params: P): string
  readonly path: string
  readonly regexp: RegExp
}

export function route<P extends {}>(path: string): Route<P> {
  const fn = (params: P) => ''

  fn.path = path
  fn.regexp = /r/

  return fn
}
