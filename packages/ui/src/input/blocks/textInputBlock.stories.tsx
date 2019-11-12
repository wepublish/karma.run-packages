import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TextInputBlock} from './textInputBlock'

export default {
  component: TextInputBlock,
  title: 'Input|Blocks/TextInputBlock',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [value, setValue] = useState('')
  return <TextInputBlock value={value} onChange={value => setValue(value)} />
}
