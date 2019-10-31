import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FavorButton} from './favorButton'
import {useState} from '@storybook/addons'

export default {
  component: FavorButton,
  title: 'Atoms|FavorButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [isFavorite, setFavorite] = useState(false)
  return <FavorButton isFavorite={isFavorite} onFavoriteChange={() => setFavorite(!isFavorite)} />
}
