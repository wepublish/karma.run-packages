import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {UnionListField} from './unionListField'
import {TextField} from './textField'
import {IconType} from '../atoms/icon'

import {UnionListValue} from './types'
import {ListField, ListValue} from './listField'
import {Grid, GridColumn} from '../atoms/grid'
import {Placeholder} from '../atoms/placeholder'

export type StringValue = UnionListValue<'string', string>
export type StringArrayValue = UnionListValue<'stringArray', ListValue<string>[]>
export type WrapperValue = StringValue | StringArrayValue

export default {
  component: UnionListField,
  title: 'Fields|UnionListField',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
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

export const WithGrid = () => {
  const [values, setValues] = useState([])

  return (
    <UnionListField value={values} onChange={setValues}>
      {{
        string: {
          field: props => (
            <Grid>
              <GridColumn ratio={1 / 4}>
                <Placeholder></Placeholder>
              </GridColumn>
              <GridColumn ratio={1 / 4}>
                <Placeholder></Placeholder>
              </GridColumn>
              <GridColumn ratio={1 / 4}>
                <Placeholder></Placeholder>
              </GridColumn>
              <GridColumn ratio={1 / 4}>
                <Placeholder></Placeholder>
              </GridColumn>
            </Grid>
          ),
          defaultValue: '',
          label: '4 Cols',
          icon: IconType.Column4
        },

        column2: {
          field: props => (
            <Grid>
              <GridColumn ratio={1 / 2}>
                <Placeholder></Placeholder>
              </GridColumn>
              <GridColumn ratio={1 / 2}>
                <Placeholder></Placeholder>
              </GridColumn>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols',
          icon: IconType.Column2
        },

        column2Alt: {
          field: props => (
            <Grid>
              <GridColumn ratio={2 / 3}>
                <Placeholder></Placeholder>
              </GridColumn>
              <GridColumn ratio={1 / 3}>
                <Placeholder></Placeholder>
              </GridColumn>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols Alt',
          icon: IconType.Column2Alt
        }
      }}
    </UnionListField>
  )
}
