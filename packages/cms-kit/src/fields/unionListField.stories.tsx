import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import {UnionListField} from './unionListField'
import {TextField} from './textField'
import {IconType} from '../atoms/icon'

import {UnionListValue} from './types'
import {ListField, ListValue} from './listField'
import {centerLayoutDecorator} from '../.storybook/decorators'

export type StringValue = UnionListValue<'string', string>
export type StringArrayValue = UnionListValue<'stringArray', ListValue<string>[]>
export type WrapperValue = StringValue | StringArrayValue

export function UnionListFieldWrapper() {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
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
  )
}

storiesOf('Fields|UnionListField', module)
  .addDecorator(centerLayoutDecorator(0.8))
  .add('default', () => <UnionListFieldWrapper />)
