import React from 'react'
import {
  createRouteContext,
  route,
  routePath,
  required,
  resolveRoutes,
  regexp
} from '@karma.run/react'

const FooRoute = route('foo', routePath`/foo/${required('foo')}`)
const BarRoute = route('bar', routePath`/bar/${required('bar')}`)
const NotFoundRoute = route('notFound', routePath`/${regexp('path', /.*/)}`)

export const {useRoute, useRouteDispatch, RouteProvider} = createRouteContext(
  (path: string) =>
    resolveRoutes(path, [FooRoute, BarRoute, NotFoundRoute] as const) ||
    NotFoundRoute.create({path: ''}),

  (route, callback) => {
    let timeoutHandle: number | null = null

    switch (route.type) {
      case 'foo':
        timeoutHandle = setTimeout(() => callback({type: 'foo'}), 1000)
        break

      case 'bar':
        timeoutHandle = setTimeout(() => callback({type: 'bar'}), 1000)
        break

      default:
        callback({type: '404'})
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
      <button onClick={() => push(BarRoute.create({bar: 'world'}, {filter: '123'}, 'comments'))}>
        Bar
      </button>
      <button onClick={() => push(FooRoute.create({foo: 'hello'}, {test: 'query'}, 'test'))}>
        Foo
      </button>
    </div>
  )
}
