import React from 'react'
import {storiesOf} from '@storybook/react'
import {TextButton} from './textButton'
import {OutlineTextButton} from './outlineTextButton'
import {TextOnlyButton} from './textOnlyButton'
import {IconLabelButton} from './iconLabelButton'
import {IconType} from '../atoms/icon'

storiesOf('Atoms|Button/Text Buttons', module)
  .add('TextButton', () => <TextButton label={'Buttonlabel'} />)
  .add('OutlineTextButton', () => <OutlineTextButton label={'Buttonlabel'} />)
  .add('TextOnlyButton', () => <TextOnlyButton label={'Buttonlabel'} />)
