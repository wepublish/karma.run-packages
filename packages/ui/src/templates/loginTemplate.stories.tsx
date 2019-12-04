import React, {useState} from 'react'

import {LoginTemplate} from './loginTemplate'

import {TextInput} from '../input/textInput'
import {Button} from '../buttons/button'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'

export default {
  component: LoginTemplate,
  title: 'Templates|LoginTemplate'
}

export const Standard = () => {
  const [username, setUsename] = useState()
  const [password, setPassword] = useState()

  return (
    <LoginTemplate backgroundChildren={'Logo'}>
      <Box marginBottom={Spacing.Small}>
        <TextInput label="Username" value={username} onChange={e => setUsename(e.target.value)} />
      </Box>
      <Box marginBottom={Spacing.Large}>
        <TextInput
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Box>
      <Button label="Login" color="primary" />
    </LoginTemplate>
  )
}
