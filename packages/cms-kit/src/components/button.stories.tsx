import React from 'react'

import {storiesOf} from '@storybook/react'
import {text} from '@storybook/addon-knobs'
import {StyleProvider, createStyleRenderer, renderStyles} from '@karma.run/react'

import {Button} from './button'

storiesOf('Button', module).add('with text', () => <Button test={text('Text', 'Hello World')} />)
