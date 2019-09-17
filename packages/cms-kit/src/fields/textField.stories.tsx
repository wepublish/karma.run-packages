import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {TextField} from './textField'

export function ListFieldWrapper() {
  const [value, setValue] = useState('')

  return <TextField value={value} onChange={value => setValue(value)} />
}

storiesOf('Fields|TextField', module).add('default', () => <ListFieldWrapper />)
