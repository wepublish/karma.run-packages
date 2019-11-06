import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FileDropInput} from './fileDropInput'
import {MaterialIconCloudUploadOutlined} from '@karma.run/icons'

export default {
  component: FileDropInput,
  title: 'Input|FileDropInput',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Interactive = () => {
  return (
    <FileDropInput
      onDrop={files => console.log(files)}
      text="Drop Files Here"
      icon={MaterialIconCloudUploadOutlined}
    />
  )
}
