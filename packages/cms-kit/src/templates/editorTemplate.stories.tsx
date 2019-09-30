import React from 'react'

import {Standard as StandardNavigationBar} from '../organisms/navigationBar.stories'
import {EditorTemplate} from './editorTemplate'
import {WithGrid} from '../fields/unionListField.stories'

export default {
  component: EditorTemplate,
  title: 'Templates|EditorTemplate'
}

export const Standard = () => (
  <EditorTemplate navigationChildren={<StandardNavigationBar />}>
    <WithGrid />
  </EditorTemplate>
)
