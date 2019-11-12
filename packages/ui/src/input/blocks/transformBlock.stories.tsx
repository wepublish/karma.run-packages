import React, {useState} from 'react'
import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TransformBlock} from './transformBlock'
import {TextInputBlock} from './textInputBlock'

export default {
  component: TransformBlock,
  title: 'Input|Blocks/TransformBlock',
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
