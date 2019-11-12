import React from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TypograpyTextArea} from './typographyTextArea'

export default {
  component: TypograpyTextArea,
  title: 'Input|Text/TypograpyTextArea',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => (
  <>
    <TypograpyTextArea variant="h1" align="center" placeholder="Header" />
    <TypograpyTextArea variant="body1" align="center" placeholder="Body" />
    <TypograpyTextArea variant="subtitle2" align="center" placeholder="Subtitle" />
  </>
)
