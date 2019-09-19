import React from 'react'

import {Standard as StandardNavigation} from '../organisms/navigation.stories'
import {NavigationTemplate} from './navigationTemplate'

export default {
  component: NavigationTemplate,
  title: 'Templates|NavigationTemplate'
}

export const Standard = () => (
  <NavigationTemplate navigationChildren={<StandardNavigation />}>
    <div style={{height: '2000px', backgroundImage: 'linear-gradient(#FFF, #000)'}} />
  </NavigationTemplate>
)
