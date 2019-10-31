import React from 'react'

import {
  MaterialIconDescription,
  MaterialIconArrowBack,
  MaterialIconPhonelink,
  MaterialIconSaveOutlined,
  MaterialIconPublishOutlined
} from '@karma.run/icons'

import {NavigationBar} from './navigationBar'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: NavigationBar,
  title: 'Organisms|NavigationBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <NavigationBar
    leftChildren={<IconLabelButton label="Back" icon={MaterialIconArrowBack} />}
    rightChildren={<IconLabelButton label="Preview" icon={MaterialIconPhonelink} />}
    centerChildren={
      <>
        <IconLabelButton label="Metadata" icon={MaterialIconDescription} />
        <IconLabelButton label="Save" icon={MaterialIconSaveOutlined} />
        <IconLabelButton label="Publish" icon={MaterialIconPublishOutlined} />
      </>
    }
  />
)
