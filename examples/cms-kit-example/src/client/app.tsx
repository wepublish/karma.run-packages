import React, {useEffect, useState} from 'react'

import {
  createRouteContext,
  route,
  routePath,
  required,
  resolveRoutes,
  regexp,
  RouteActionType
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

const routes = [FooRoute, BarRoute, NotFoundRoute] as const

export const {useRoute, useRouteDispatch, RouteProvider} = createRouteContext(routes)

export function App() {
  return (
    <RouteProvider
      resolveRoute={path =>
        resolveRoutes(path, routes) || NotFoundRoute.create({params: {path: '123'}})
      }
      handleNextRoute={(route, dispatch) => {
        let timeoutHandle: number | null = null

        if (!route.data) {
          switch (route.type) {
            case 'foo':
              timeoutHandle = setTimeout(
                () =>
                  dispatch({
                    type: RouteActionType.SetCurrentRoute,
                    route: {...route, data: {foo: '123'}}
                  }),
                1000
              )
              break

            case 'bar':
              timeoutHandle = setTimeout(
                () =>
                  dispatch({
                    type: RouteActionType.SetCurrentRoute,
                    route: {...route, data: {bar: '123'}}
                  }),
                1000
              )
              break

            default:
              dispatch({
                type: RouteActionType.SetCurrentRoute,
                route: {...route}
              })
          }
        } else {
          dispatch({type: RouteActionType.SetCurrentRoute, route: {...route}})
        }

        return () => timeoutHandle && clearTimeout(timeoutHandle)
      }}>
      <Router />
    </RouteProvider>
  )
}

export function Router() {
  const route = useRoute()
  const dispatch = useRouteDispatch()

  return (
    <div style={{height: '2000px', background: 'linear-gradient(#fff, #000)'}}>
      <Content />
      {/* <pre>{JSON.stringify(route, undefined, 2)}</pre> */}
      <div style={{position: 'fixed'}}>
        <button
          onClick={() =>
            dispatch({
              type: RouteActionType.PushRoute,
              route: NotFoundRoute.create({params: {path: 'test'}, scroll: {x: 0, y: 0}})
            })
          }>
          Home
        </button>
        <button
          onClick={() =>
            dispatch({
              type: RouteActionType.PushRoute,
              route: BarRoute.create({
                params: {bar: 'world'},
                query: {filter: '123'},
                hash: 'comments',
                scroll: {x: 0, y: 0}
              })
            })
          }>
          Bar
        </button>
        <button
          onClick={() =>
            dispatch({
              type: RouteActionType.PushRoute,
              route: FooRoute.create({
                params: {foo: 'hello'},
                query: {test: 'query'},
                hash: 'test',
                scroll: {x: 0, y: 0}
              })
            })
          }>
          Foo
        </button>
      </div>
    </div>
  )
}

export function Content() {
  const route = useRoute()
  const [next, setNext] = useState<typeof route.next | null>(null)
  const activeRoute = next || route.current

  useEffect(() => {
    if ('scrollRestoration' in history && history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (route.next) {
      const timeoutHandle = setTimeout(() => {
        setNext(route.next)
      }, 400)

      return () => clearTimeout(timeoutHandle)
    } else {
      setNext(null)
      return () => {}
    }
  }, [route.next])

  useEffect(() => {
    if (activeRoute && activeRoute.scroll) {
      window.scrollTo(activeRoute.scroll.x, activeRoute.scroll.y)
    }

    if (activeRoute && activeRoute.hash) {
      const element = document.getElementById(activeRoute.hash)
      if (element) element.scrollIntoView()
    }
  }, [activeRoute, route.previous])

  if (!activeRoute) return null

  switch (activeRoute.type) {
    case 'bar':
      return <div>Bar: {activeRoute.data ? activeRoute.data.bar : 'Loading...'}</div>
    case 'foo':
      return (
        <div>
          Foo:{' '}
          {activeRoute.data ? (
            <div>
              <div style={{height: '500px'}}></div>
              <a id="test">Test</a>
            </div>
          ) : (
            'Loading...'
          )}
        </div>
      )
    case 'notFound':
      return <div>NotFound: {activeRoute.data.notFound}</div>
  }
}
