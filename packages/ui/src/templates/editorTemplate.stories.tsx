import React from 'react'

import {WithGrid} from '../input/fields/blockListField.stories'
import {Standard as StandardNavigationBar} from '../organisms/navigationBar.stories'
import {EditorTemplate} from './editorTemplate'

export default {
  component: EditorTemplate,
  title: 'Templates|EditorTemplate'
}

export const Standard = () => (
  <EditorTemplate navigationChildren={<StandardNavigationBar />}>
    <WithGrid />
  </EditorTemplate>
)
