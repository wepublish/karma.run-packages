import React from 'react'
import {
  createRouteContext,
  route,
  routePath,
  required,
  resolveRoutes,
  regexp
} from '@karma.run/react'

export interface BarRouteData {
  bar: string
}

export interface FooRouteData {
  foo: string
}

export interface NotFoundRouteData {
  notFound: string
}

const FooRoute = route('foo', routePath`/foo/${required('foo')}`, null as FooRouteData | null)
const BarRoute = route('bar', routePath`/bar/${required('bar')}`, null as BarRouteData | null)

const NotFoundRoute = route('notFound', routePath`/${regexp('path', /.*/)}`, {
  notFound: '404'
} as NotFoundRouteData)

export const {useRoute, useRouteDispatch, RouteProvider} = createRouteContext(
  (path: string) =>
    resolveRoutes(path, [FooRoute, BarRoute, NotFoundRoute] as const) ||
    NotFoundRoute.create({path: ''}, undefined),

  (route, callback) => {
    let timeoutHandle: number | null = null

    if (!route.data) {
      switch (route.type) {
        case 'foo':
          timeoutHandle = setTimeout(
            () => callback(FooRoute.create(route.params, {foo: 'foo'}, route.query, route.hash)),
            1000
          )
          break

        case 'bar':
          timeoutHandle = setTimeout(
            () => callback(BarRoute.create(route.params, {bar: 'bar'}, route.query, route.hash)),
            1000
          )
          break

        default:
          callback(route)
      }
    } else {
      callback(route)
    }

    return () => timeoutHandle && clearTimeout(timeoutHandle)
  }
)

export function App() {
  return (
    <RouteProvider>
      <Router />
    </RouteProvider>
  )
}

export function Router() {
  const route = useRoute()
  const {push} = useRouteDispatch()

  return (
    <div style={{height: '2000px'}}>
      <pre>{JSON.stringify(route, undefined, 2)}</pre>
      <button onClick={() => push(NotFoundRoute.create({path: 'test'}))}>Home</button>
      <button
        onClick={() =>
          push(BarRoute.create({bar: 'world'}, undefined, {filter: '123'}, 'comments'))
        }>
        Bar
      </button>
      <button
        onClick={() => push(FooRoute.create({foo: 'hello'}, undefined, {test: 'query'}, 'test'))}>
        Foo
      </button>
    </div>
  )
}
