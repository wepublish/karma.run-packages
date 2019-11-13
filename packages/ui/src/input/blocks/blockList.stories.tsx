import React, {useState} from 'react'

import {
  IconColumn4,
  IconColumn2,
  IconColumn2Alt,
  MaterialIconTextFormat,
  MaterialIconShortText
} from '@karma.run/icons'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {BlockList, BlockListValue} from './blockList'
import {TextInputBlock} from './textInputBlock'
import {RichTextInputBlock} from './richTextInputBlock'

import {ListField, ListValue} from './listField'
import {Grid, Column} from '../../layout/grid'
import {PlaceholderInput} from '../other/placeholderInput'
import {Box} from '../../layout/box'
import {Value, Document, Block} from 'slate'

export type RichTextValue = BlockListValue<'richText', Value>
export type StringValue = BlockListValue<'string', string>
export type StringArrayValue = BlockListValue<'stringArray', ListValue<string>[]>
export type WrapperValue = RichTextValue | StringValue | StringArrayValue

export default {
  component: BlockList,
  title: 'Input|Blocks/BlockList',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Default = () => {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <BlockList value={values} onChange={setValues} allowInit>
      {{
        richText: {
          field: props => <RichTextInputBlock {...props} />,
          defaultValue: () => Value.create({document: Document.create([Block.create('')])}),
          label: 'Rich Text',
          icon: MaterialIconTextFormat
        },

        string: {
          field: props => <TextInputBlock {...props} />,
          defaultValue: '',
          label: 'String',
          icon: MaterialIconTextFormat
        },

        stringArray: {
          field: props => (
            <ListField {...props} defaultValue="">
              {props => <TextInputBlock {...props} />}
            </ListField>
          ),
          defaultValue: [],
          label: 'String Array',
          icon: MaterialIconShortText
        }
      }}
    </BlockList>
  )
}

export const WithGrid = () => {
  const [values, setValues] = useState([])

  return (
    <BlockList value={values} onChange={setValues}>
      {{
        string: {
          field: props => (
            <Grid>
              <Column ratio={1 / 4}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
              <Column ratio={1 / 4}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
              <Column ratio={1 / 4}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
              <Column ratio={1 / 4}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
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
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
              <Column ratio={1 / 2}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
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
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
              <Column ratio={1 / 3}>
                <Box height={200}>
                  <PlaceholderInput></PlaceholderInput>
                </Box>
              </Column>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols Alt',
          icon: IconColumn2Alt
        }
      }}
    </BlockList>
  )
}
