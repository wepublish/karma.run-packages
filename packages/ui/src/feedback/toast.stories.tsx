import React, {useState} from 'react'
import {Toast, ToastType} from './toast'
import {Button} from '../input/buttons/button'
import {Grid, Column} from '../layout/grid'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Spacing} from '../style/helpers'

export default {
  component: Toast,
  title: 'Feedback|Toast',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<ToastType>('info')

  return (
    <>
      <Grid spacing={Spacing.Medium}>
        <Column ratio={1 / 3}>
          <Button
            label={'Info'}
            onClick={() => {
              setType('info')
              setOpen(true)
            }}
            fill
          />
        </Column>
        <Column ratio={1 / 3}>
          <Button
            label={'Success'}
            onClick={() => {
              setType('success')
              setOpen(true)
            }}
            fill
          />
        </Column>
        <Column ratio={1 / 3}>
          <Button
            label={'Error'}
            onClick={() => {
              setType('error')
              setOpen(true)
            }}
            fill
          />
        </Column>
      </Grid>
      <Toast type={type} open={open} onClose={() => setOpen(false)} autoHideDuration={2000}>
        I'm a Toast!
      </Toast>
    </>
  )
}
