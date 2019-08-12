import React from 'react'
import {createRouteContext, route, routePath, required, resolveRoutes} from '@karma.run/react'

const FooRoute = route('foo', routePath`/foo/${required('foo')}`)
const BarRoute = route('bar', routePath`/bar/${required('bar')}`)

export const {useRoute, useRouteDispatch, pushRouteAction, RouteProvider} = createRouteContext(
  (path: string) =>
    resolveRoutes(path, [FooRoute, BarRoute] as const) ||
    ({type: '404', params: {}, path: window.location.pathname} as const),

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
  const routeDispatch = useRouteDispatch()

  return (
    <div style={{height: '2000px'}}>
      <pre>{JSON.stringify(route, undefined, 2)}</pre>
      <a
        onClick={() => {
          routeDispatch(pushRouteAction(FooRoute.create({foo: '123'})))
        }}>
        Test
      </a>
    </div>
  )
}
