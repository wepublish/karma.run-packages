import React from 'react'
import {Button} from '@karma.run/cms-kit'
import {route, routePath, RouteInstancesForRoutes, createRouteContext} from '@karma.run/react'

export const IndexRoute = route('test', routePath`/`, null)

export const routes = [IndexRoute] as const

export const {
  Link,
  createLinkHOC,
  RouteProvider,
  matchRoute,
  useRoute,
  useRouteDispatch
} = createRouteContext(routes)

export const LinkButton = createLinkHOC(Button)

export type Route = RouteInstancesForRoutes<typeof routes>

export function App() {
  return (
    <RouteProvider>
      <LinkButton title="Hello World" route={IndexRoute.create({})} />
    </RouteProvider>
  )
}
