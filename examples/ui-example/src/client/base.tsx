import React, {ReactNode} from 'react'

import {NavigationTemplate} from '@karma.run/ui'
import {MaterialIconInsertDriveFileOutlined, MaterialIconPowerSettingsNew} from '@karma.run/icons'

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
            route={ArticleListRoute.create({}, {query: {test: '123'}})}
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
