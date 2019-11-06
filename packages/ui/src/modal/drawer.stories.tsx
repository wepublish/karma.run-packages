import React, {useState} from 'react'

import {PrimaryButton} from '../atoms/primaryButton'
import {Drawer} from './drawer'
import {Default as DefaultPanel} from '../panel/panel.stories'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Drawer,
  title: 'Modal|Drawer',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PrimaryButton label={'Open Drawer'} onClick={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)} width={480}>
        {() => <DefaultPanel />}
      </Drawer>
    </>
  )
}
