import React from 'react'

import {WithGrid} from '../blocks/blockList.stories'
import {Standard as StandardNavigationBar} from '../navigation/navigationBar.stories'
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
