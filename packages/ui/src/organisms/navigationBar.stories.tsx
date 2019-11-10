import React from 'react'

import {
  MaterialIconDescription,
  MaterialIconArrowBack,
  MaterialIconPhonelink,
  MaterialIconSaveOutlined,
  MaterialIconPublishOutlined
} from '@karma.run/icons'

import {NavigationBar} from './navigationBar'
import {NavigationButton} from '../input/navigationButton'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: NavigationBar,
  title: 'Organisms|NavigationBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <NavigationBar
    leftChildren={<NavigationButton label="Back" icon={MaterialIconArrowBack} />}
    rightChildren={<NavigationButton label="Preview" icon={MaterialIconPhonelink} />}
    centerChildren={
      <>
        <NavigationButton label="Metadata" icon={MaterialIconDescription} />
        <NavigationButton label="Save" icon={MaterialIconSaveOutlined} />
        <NavigationButton label="Publish" icon={MaterialIconPublishOutlined} />
      </>
    }
  />
)
