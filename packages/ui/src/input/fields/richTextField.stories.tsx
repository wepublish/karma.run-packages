import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {RichTextField} from './richTextField'
import {Value, Document, Block} from 'slate'

export default {
  component: RichTextField,
  title: 'Input|Fields/RichTextField',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const [values, setValue] = useState<Value>(() =>
    Value.create({document: Document.create([Block.create('')])})
  )

  return <RichTextField value={values} onChange={setValue} />
}
