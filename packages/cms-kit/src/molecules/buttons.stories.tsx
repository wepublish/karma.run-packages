import React from 'react'
import {storiesOf} from '@storybook/react'
import {TextButton} from './textButton'
import {OutlineTextButton} from './outlineTextButton'
import {TextOnlyButton} from './textOnlyButton'
import {IconLabelButton} from './iconLabelButton'
import {IconType} from '../atoms/icon'
import {RoundIconButton} from './roundIconButton'
import {OptionButton} from './optionButton'
import {OptionButtonShadow} from './optionButtonShadow'

import {centerLayoutDecorator, InfoBox} from '../.storybook/decorators'

storiesOf('Atoms|Button/Text Buttons', module)
  .addDecorator(centerLayoutDecorator())
  .add('TextButton', () => <TextButton label={'Buttonlabel'} />)
  .add('OutlineTextButton', () => <OutlineTextButton label={'Buttonlabel'} />)
  .add('TextOnlyButton', () => <TextOnlyButton label={'Buttonlabel'} />)

storiesOf('Atoms|Button/Icon Buttons', module)
  .addDecorator(centerLayoutDecorator())
  .add('IconLabelButton', () => <IconLabelButton label={'Preview'} icon={IconType.Preview} />)
  .add('RoundIconButton', () => <RoundIconButton icon={IconType.Add} />)
  .add('OptionButton', () => <OptionButton icon={IconType.ChevronDown} />)
  .add('OptionButtonShadow', () => <OptionButtonShadow icon={IconType.ChevronDown} />)
