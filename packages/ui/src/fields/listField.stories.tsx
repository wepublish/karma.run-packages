import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ListField, ListValue} from './listField'
import {TextField} from './textField'

export default {
  component: ListField,
  title: 'Fields|ListField',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [values, setValues] = useState<ListValue<string>[]>([])

  return (
    <ListField value={values} onChange={setValues} defaultValue={''}>
      {props => <TextField {...props} />}
    </ListField>
  )
}
