import React, {useState} from 'react'

import {Button} from '../input/button'
import {Modal} from './modal'
import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: Modal,
  title: 'Modal|Modal',
  decorators: [centerLayoutDecorator()]
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button label={'Open Modal'} onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} closeOnBackgroundClick>
        {() => null}
      </Modal>
    </>
  )
}
