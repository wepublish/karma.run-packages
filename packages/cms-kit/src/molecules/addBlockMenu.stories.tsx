import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockMenu} from './addBlockMenu'
import {mockArticleBlockSelectors} from './overlayMenu.stories'

export function BlockSelectorMenuWrapper() {
  const [isOpen, setOpen] = useState(false)

  return (
    <AddBlockMenu
      isOpen={isOpen}
      onAddClick={() => {
        setOpen(!isOpen)
      }}
      menuItems={mockArticleBlockSelectors}
    />
  )
}

storiesOf('Molecules|AddBlock', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('AddBlockMenu', () => <BlockSelectorMenuWrapper />)
