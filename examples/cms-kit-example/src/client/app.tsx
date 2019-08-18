import React, {useEffect, useState} from 'react'
import {
  route,
  routePath,
  required,
  createRouteContext,
  setCurrentRoute,
  zeroOrMore
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
const NoParamRoute = route(
  'noParam',
  routePath`/noparam/${required('id')}/${zeroOrMore('path')}`,
  null
)

export const {useRoute, useRouteDispatch, RouteProvider, Link, matchRoute} = createRouteContext([
  FooRoute,
  BarRoute,
  NoParamRoute
] as const)

export function App() {
  return (
    <RouteProvider
      handleNextRoute={(route, dispatch) => {
        let timeoutHandle: number | null = null

        if (!route.data) {
          switch (route.type) {
            case 'foo':
              timeoutHandle = setTimeout(
                () => dispatch(setCurrentRoute({...route, data: {foo: '123'}})),
                300
              )
              break

            case 'bar':
              timeoutHandle = setTimeout(
                () => dispatch(setCurrentRoute({...route, data: {bar: '123'}})),
                300
              )
              break

            default:
              dispatch(setCurrentRoute(route))
          }
        } else {
          dispatch(setCurrentRoute(route))
        }

        return () => timeoutHandle && clearTimeout(timeoutHandle)
      }}>
      <Router />
    </RouteProvider>
  )
}

export function Router() {
  return (
    <div style={{height: '2000px', background: 'linear-gradient(#fff, #000)'}}>
      <Content />
      <div style={{position: 'fixed'}}>
        <Link route={NoParamRoute.create({path: 'test'})}>No Param</Link>
        <Link route={NoParamRoute.create({})}>No Param 2</Link>

        <Link
          route={FooRoute.create(
            {foo: 'hello'},
            {
              query: {test: 'query'},
              hash: 'test'
            }
          )}>
          Foo
        </Link>

        <Link
          route={BarRoute.create(
            {bar: 'world'},
            {
              query: {test: 'query'},
              hash: 'test'
            }
          )}>
          Bar
        </Link>
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

  if (!activeRoute) return <div>404</div>

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

    case 'noParam':
      return <div>NoParam: {activeRoute.params.path}</div>
  }
}
