import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Link} from './link'

export default {
  component: Link,
  title: 'Data|Link',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => <Link href="#">This is a link</Link>
