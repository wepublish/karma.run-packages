import React, {useState} from 'react'
import {Toast, ToastType} from './toast'
import {PrimaryButton} from '../atoms/primaryButton'
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
          <PrimaryButton
            label={'Info'}
            onClick={() => {
              setType('info')
              setOpen(true)
            }}
            fill
          />
        </Column>
        <Column ratio={1 / 3}>
          <PrimaryButton
            label={'Success'}
            onClick={() => {
              setType('success')
              setOpen(true)
            }}
            fill
          />
        </Column>
        <Column ratio={1 / 3}>
          <PrimaryButton
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
