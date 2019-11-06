import React from 'react'

import {
  MaterialIconDescription,
  MaterialIconArrowBack,
  MaterialIconPhonelink,
  MaterialIconSaveOutlined,
  MaterialIconPublishOutlined
} from '@karma.run/icons'

import {NavigationBar} from './navigationBar'
import {IconButton} from '../atoms/iconButton'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: NavigationBar,
  title: 'Organisms|NavigationBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <NavigationBar
    leftChildren={<IconButton label="Back" icon={MaterialIconArrowBack} />}
    rightChildren={<IconButton label="Preview" icon={MaterialIconPhonelink} />}
    centerChildren={
      <>
        <IconButton label="Metadata" icon={MaterialIconDescription} />
        <IconButton label="Save" icon={MaterialIconSaveOutlined} />
        <IconButton label="Publish" icon={MaterialIconPublishOutlined} />
      </>
    }
  />
)
