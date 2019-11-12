import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {RichTextInputBlock} from './richTextInputBlock'
import {Value, Document, Block} from 'slate'

export default {
  component: RichTextInputBlock,
  title: 'Input|Blocks/RichTextInputBlock',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Default = () => {
  const [values, setValue] = useState<Value>(() =>
    Value.create({document: Document.create([Block.create('')])})
  )

  return <RichTextInputBlock value={values} onChange={setValue} />
}
