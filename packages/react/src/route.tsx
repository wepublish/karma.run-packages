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

export interface RoutePath<K extends string> {
  readonly templatePath: string
  readonly reverse: (params: {[T in K]: string}) => string
}

export interface Route<T extends string | number | symbol = string, K extends string = any> {
  (params: {[T in K]: string}): RouteInstance<T, K>

  readonly type: T
  readonly path: RoutePath<K>
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

export function route<T extends string, K extends string>(
  type: T,
  path: RoutePath<K>
): Route<T, K> {
  function routeFn(params: {[T in K]: string}) {
    return {
      type,
      path: path.reverse(params),
      params
    }
  }

  routeFn.type = type
  routeFn.path = path

  return routeFn
}

// export function createRouteContext2<T>(): CreateRouteContextResult<T> {
//   function pushRouteAction(route: T): PushRouteAction<T> {
//     return {type: RouteActionType.PushRoute, route}
//   }

//   function pushPathAction(path: string): PushPathAction {
//     return {type: RouteActionType.PushPath, path}
//   }

//   return {
//     RouteProvider({initialRoute, queryRouteData}: RouteProviderProps<M>) {
//       const [state, dispatch] = useReducer(routeReducer, {
//         current: initialRoute,
//         next: null
//       })

//       // `dispatch` function identity will not change, but for consistency's sake we still add it to
//       // the dependencies array.
//       useEffect(() => {
//         if (!state.next) return

//         const cancel = queryRoute(state.next, () => {})
//         return cancel
//       }, [state.next, dispatch])

//       useEffect(() => {
//         const path = reverseRoute(state.current)

//         if (window.location.pathname !== path) {
//           window.history.pushState(state.current, '', path)
//         } else {
//           window.history.replaceState(state.current, '', path)
//         }
//       }, [state.current])

//       useEventListener(() => [
//         window,
//         'popstate',
//         (e: PopStateEvent) => {
//           if (e.state) {
//             dispatch(pushRouteAction(e.state))
//           } else {
//             dispatch(pushPathAction(window.location.pathname))
//           }
//         }
//       ])

//       return (
//         <RouteDispatchContext.Provider value={dispatch}>
//           <RouteContext.Provider value={state}>{props.children}</RouteContext.Provider>
//         </RouteDispatchContext.Provider>
//       )
//     },

//     pushRouteAction,
//     pushPathAction,

//     useRoute(): T {
//       const routeContext = useContext(RouteContext)

//       if (!routeContext) {
//         throw new Error(
//           "Couldn't find a RouteContext provider, did you forget to include RouteProvider in the component tree."
//         )
//       }

//       return routeContext.current
//     },

//     useRouteDispatch(): RouteDispatchContextState<T> {
//       const routeDispatchContext = useContext(RouteDispatchContext)

//       if (!routeDispatchContext) {
//         throw new Error(
//           "Couldn't find a RouteDispatchContext provider, did you forget to include RouteProvider in the component tree."
//         )
//       }

//       return routeDispatchContext
//     }
//   }
// }

// enum RouteType {
//   Foo = 'foo',
//   Bar = 'bar'
// }

// export interface TestRouteDataMap {
//   [RouteType.Foo]: {foo: string}
//   [RouteType.Bar]: {bar: string}
// }

// const FooRoute = routePath`/test/${param('foo')}`
// const BarRoute = routePath`/test/${param('bar')}`

// export type Routes = typeof FooRoute | typeof BarRoute
