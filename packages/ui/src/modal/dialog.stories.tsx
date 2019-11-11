import React, {useState} from 'react'

import {Button} from '../input/buttons/button'
import {Dialog} from './dialog'
import {Default as DefaultPanel} from '../panel/panel.stories'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Dialog,
  title: 'Modal|Dialog',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button label={'Open Dialog'} onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} width={480} closeOnBackgroundClick>
        {() => <DefaultPanel />}
      </Dialog>
    </>
  )
}
