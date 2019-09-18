import React from 'react'

import {storiesOf} from '@storybook/react'
import {EditorTemplate} from './editorTemplate'
import {UnionListFieldWrapper} from '../fields/unionListField.stories'

storiesOf('Templates|EditorTemplate', module).add('default', () => (
  <EditorTemplate>
    <UnionListFieldWrapper />
  </EditorTemplate>
))
