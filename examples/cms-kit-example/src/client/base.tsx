import React, {ReactNode} from 'react'
import {NavigationTemplate, IconType} from '@karma.run/cms-kit'
import {LinkMenuIconButton, LogoutRoute, ArticleListRoute} from './route'

export interface BaseProps {
  readonly children?: ReactNode
}

export function Base({children}: BaseProps) {
  return (
    <NavigationTemplate
      navigationChildren={
        <>
          <LinkMenuIconButton
            icon={IconType.Article}
            label="Article"
            route={ArticleListRoute.create({})}
          />

          <LinkMenuIconButton
            icon={IconType.Logout}
            label="Logout"
            route={LogoutRoute.create({})}
          />
        </>
      }>
      {children}
    </NavigationTemplate>
  )
}
