import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {mockArticleBlockSelectors, mockOptionMenuItems} from './overlayMenu.stories'
import {OptionMenu} from './optionMenu'

export function OptionMenuWrapper() {
  const [isOpen, setOpen] = useState(false)

  return (
    <OptionMenu
      isOpen={isOpen}
      onAddClick={() => {
        setOpen(!isOpen)
      }}
      menuItems={mockOptionMenuItems}
    />
  )
}

storiesOf('Molecules|MoreOptions', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('OptionMenu', () => <OptionMenuWrapper />)
