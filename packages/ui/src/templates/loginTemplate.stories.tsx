import React from 'react'

import {LoginTemplate} from './loginTemplate'

import {TextInput} from '../atoms/textInput'
import {Button} from '../input/button'
import {Box} from '../layout/box'

export default {
  component: LoginTemplate,
  title: 'Templates|LoginTemplate'
}

export const Standard = () => {
  return (
    <LoginTemplate>
      <Box>
        <TextInput label="Username" value={''} onChange={() => {}} />
      </Box>
      <Box>
        <TextInput label="Password" value={''} onChange={() => {}} />
      </Box>

      <Button label="Login" />
    </LoginTemplate>
  )
}
