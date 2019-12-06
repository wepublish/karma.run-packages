import React, {useState, memo} from 'react'

import {IconColumn4, IconColumn2, IconColumn2Alt, MaterialIconTextFormat} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {BlockList, BlockListValue, useBlockMap} from './blockList'

import {Grid, Column} from '../layout/grid'
import {PlaceholderInput} from '../input/placeholderInput'
import {Box} from '../layout/box'
import {BlockProps} from './block'
import {TextInput} from '../input/textInput'

export type StringValue = BlockListValue<'string', string>
export type WrapperValue = StringValue

export default {
  component: BlockList,
  title: 'Blocks|BlockList',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Default = () => {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <BlockList value={values} onChange={setValues}>
      {useBlockMap<WrapperValue>(
        () => ({
          string: {
            field: props => <TextInputBlock {...props} />,
            defaultValue: '',
            label: 'String',
            icon: MaterialIconTextFormat
          }
        }),
        []
      )}
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

const TextInputBlock = memo(({value, onChange}: BlockProps<string>) => {
  return (
    <TextInput
      label="Label"
      value={value}
      onChange={e => {
        onChange(e.currentTarget.value)
      }}
    />
  )
})
