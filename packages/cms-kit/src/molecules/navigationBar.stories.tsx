import React from 'react'

import {storiesOf} from '@storybook/react'
import {NavigationBar} from './navigationBar'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {IconType} from '../atoms/icon'
import {centerLayoutDecorator} from '../.storybook/decorators'

storiesOf('Molecules|NavigationBar', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('default', () => (
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
  ))
