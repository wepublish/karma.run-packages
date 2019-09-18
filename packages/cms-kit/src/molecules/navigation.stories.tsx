import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType, IconSize} from '../atoms/icon'
import {Navigation} from './navigation'
import {MenuIconButton} from '../atoms/menuIconButton'
import {pxToRem} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

const MenuItemStyle = cssRuleWithTheme(({theme}) => ({
  paddingTop: pxToRem(12),
  paddingBottom: pxToRem(12),
  paddingLeft: pxToRem(18)
}))

export function NavigationWrapper() {
  const [isOpen, setOpen] = useState(true)
  const {css} = useThemeStyle()

  return (
    <Navigation
      isOpen={isOpen}
      onChange={() => {
        setOpen(!isOpen)
      }}>
      {mockNaviItems.map((item, index) => (
        <MenuIconButton
          style={MenuItemStyle}
          key={index}
          icon={item.icon}
          iconSize={IconSize.Medium}
          title={item.label}
          showTitle={isOpen}
        />
      ))}
    </Navigation>
  )
}

export function LayoutWrapper() {
  const [isOpen, setOpen] = useState(true)
  const {css} = useThemeStyle()

  return (
    <div>
      <Navigation
        isOpen={isOpen}
        onChange={() => {
          setOpen(!isOpen)
        }}>
        {mockNaviItems.map((item, index) => (
          <MenuIconButton
            style={MenuItemStyle}
            key={index}
            icon={item.icon}
            iconSize={IconSize.Medium}
            title={item.label}
            showTitle={isOpen}
          />
        ))}
      </Navigation>
      <div>content</div>
    </div>
  )
}

storiesOf('Molecules|Navigation', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <NavigationWrapper />)

storiesOf('Molecules|Navigation', module).add('in layout', () => <LayoutWrapper />)

const mockNaviItems = [
  {id: 'article', icon: IconType.Article, label: 'Article'},
  {id: 'pages', icon: IconType.Page, label: 'Pages'},
  {id: 'mediaLibrary', icon: IconType.MediaLibrary, label: 'Media Library'},
  {id: 'proofreading', icon: IconType.Proofreading, label: 'Proofreading'},
  {id: 'menu', icon: IconType.Menu, label: 'Menu'},
  {id: 'logout', icon: IconType.Logout, label: 'Logout'}
]
