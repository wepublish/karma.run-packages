import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {DraggableContainer, Draggable} from './draggable'
import {Box} from '../layout/box'
import {Button} from '../input/button'

export default {
  component: Draggable,
  title: 'Interaction|Draggable',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => {
  const [point, setPoint] = useState({x: 0.5, y: 0.5})

  return (
    <Box height={200}>
      <DraggableContainer>
        <Draggable point={point} onChange={setPoint}>
          <Button label="Drag Me" />
        </Draggable>
      </DraggableContainer>
    </Box>
  )
}
