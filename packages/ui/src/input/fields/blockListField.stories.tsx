import React, {useState} from 'react'

import {
  IconColumn4,
  IconColumn2,
  IconColumn2Alt,
  MaterialIconTextFormat,
  MaterialIconShortText
} from '@karma.run/icons'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {BlockListField, BlockListValue} from './blockListField'
import {TextField} from './textField'

import {ListField, ListValue} from './listField'
import {Grid, Column} from '../../layout/grid'
import {PlaceholderInput} from '../other/placeholderInput'

export type StringValue = BlockListValue<'string', string>
export type StringArrayValue = BlockListValue<'stringArray', ListValue<string>[]>
export type WrapperValue = StringValue | StringArrayValue

export default {
  component: BlockListField,
  title: 'Input|Fields/BlockListField',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <BlockListField value={values} onChange={setValues}>
      {{
        string: {
          field: props => <TextField {...props} />,
          defaultValue: '',
          label: 'String',
          icon: MaterialIconTextFormat
        },

        stringArray: {
          field: props => (
            <ListField {...props} defaultValue="">
              {props => <TextField {...props} />}
            </ListField>
          ),
          defaultValue: [],
          label: 'String Array',
          icon: MaterialIconShortText
        }
      }}
    </BlockListField>
  )
}

export const WithGrid = () => {
  const [values, setValues] = useState([])

  return (
    <BlockListField value={values} onChange={setValues}>
      {{
        string: {
          field: props => (
            <Grid>
              <Column ratio={1 / 4}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
              <Column ratio={1 / 4}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
              <Column ratio={1 / 4}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
              <Column ratio={1 / 4}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
            </Grid>
          ),
          defaultValue: '',
          label: '4 Cols',
          icon: IconColumn4
        },

        column2: {
          field: props => (
            <Grid>
              <Column ratio={1 / 2}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
              <Column ratio={1 / 2}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols',
          icon: IconColumn2
        },

        column2Alt: {
          field: props => (
            <Grid>
              <Column ratio={2 / 3}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
              <Column ratio={1 / 3}>
                <PlaceholderInput></PlaceholderInput>
              </Column>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols Alt',
          icon: IconColumn2Alt
        }
      }}
    </BlockListField>
  )
}
