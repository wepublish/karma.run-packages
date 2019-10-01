import React from 'react'

import {LoginTemplate} from './loginTemplate'

import {TextInput} from '../atoms/textInput'
import {PrimaryButton} from '../atoms/primaryButton'

export default {
  component: LoginTemplate,
  title: 'Templates|LoginTemplate'
}

export const Standard = () => {
  return (
    <LoginTemplate>
      <TextInput label="Username" value={''} onChange={() => {}} />
      <TextInput label="Password" value={''} onChange={() => {}} />
      <PrimaryButton label="Login" />
    </LoginTemplate>
  )
}
