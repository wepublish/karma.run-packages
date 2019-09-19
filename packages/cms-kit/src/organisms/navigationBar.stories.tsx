import React from 'react'

import {NavigationBar} from './navigationBar'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {IconType} from '../atoms/icon'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: NavigationBar,
  title: 'Organisms|NavigationBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <NavigationBar
    leftChildren={<IconLabelButton label="Back" icon={IconType.ArrowLeft} />}
    rightChildren={<IconLabelButton label="Preview" icon={IconType.Preview} />}
    centerChildren={
      <>
        <IconLabelButton label="Metadata" icon={IconType.Description} />
        <IconLabelButton label="Save" icon={IconType.Save} />
        <IconLabelButton label="Publish" icon={IconType.Publish} />
      </>
    }
  />
)
