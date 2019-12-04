import React, {useState} from 'react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {TransformBlock} from './transformBlock'
import {BlockProps} from './block'
import {TextInput} from '../input/textInput'

export default {
  component: TransformBlock,
  title: 'Blocks|TransformBlock',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [value, setValue] = useState<number>(0)

  return (
    <TransformBlock
      value={value}
      onChange={value => setValue(value)}
      transformTo={value => value.toString()}
      transformFrom={(value: string) => parseInt(value)}>
      {props => <TextInputBlock {...props} />}
    </TransformBlock>
  )
}

function TextInputBlock({value, onChange}: BlockProps<string>) {
  return (
    <TextInput
      label="Label"
      value={value}
      onChange={e => {
        onChange(e.currentTarget.value)
      }}
    />
  )
}
