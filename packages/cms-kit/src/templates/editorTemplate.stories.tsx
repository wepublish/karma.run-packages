import React, {useState} from 'react'

import {Standard as StandardNavigationBar} from '../organisms/navigationBar.stories'
import {WrapperValue} from '../fields/unionListField.stories'

import {EditorTemplate} from './editorTemplate'
import {UnionListField} from '../fields/unionListField'
import {TextField} from '../fields/textField'
import {IconType} from '../atoms/icon'
import {ListField} from '../fields/listField'

export default {
  component: EditorTemplate,
  title: 'Templates|EditorTemplate'
}

export const Standard = () => {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <EditorTemplate navigationChildren={<StandardNavigationBar />}>
      <UnionListField value={values} onChange={setValues}>
        {{
          string: {
            field: props => <TextField {...props} />,
            defaultValue: '',
            label: 'String',
            icon: IconType.Replace
          },

          stringArray: {
            field: props => (
              <ListField {...props} defaultValue="">
                {props => <TextField {...props} />}
              </ListField>
            ),
            defaultValue: [],
            label: 'String Array',
            icon: IconType.DropHere
          }
        }}
      </UnionListField>
    </EditorTemplate>
  )
}
