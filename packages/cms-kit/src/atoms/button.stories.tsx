import React from 'react'

import {storiesOf} from '@storybook/react'
import {text} from '@storybook/addon-knobs'

import {Button} from './button'

storiesOf('Atoms|Button', module).add('with text', () => (
  <Button test={text('Text', 'Hello World')} />
))
