import React, {useRef, useEffect} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TypographicTextArea} from './typographicTextArea'

export default {
  component: TypographicTextArea,
  title: 'Input|TypographicTextArea',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <>
    <TypographicTextArea variant="h1" align="center" placeholder="Header" />
    <TypographicTextArea variant="body1" align="center" placeholder="Body" />
    <TypographicTextArea variant="subtitle2" align="center" placeholder="Subtitle" />
  </>
)
