import React, {ReactNode} from 'react'

import {
  NavigationTemplate,
  MaterialIconInsertDriveFileOutlined,
  MaterialIconPowerSettingsNew
} from '@karma.run/cms-kit'

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
            icon={MaterialIconInsertDriveFileOutlined}
            label="Article"
            route={ArticleListRoute.create({})}
          />

          <LinkMenuIconButton
            icon={MaterialIconPowerSettingsNew}
            label="Logout"
            route={LogoutRoute.create({})}
          />
        </>
      }>
      {children}
    </NavigationTemplate>
  )
}
