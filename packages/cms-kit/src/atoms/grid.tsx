import React, {ReactNode, Children} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {pxToRem, whenDesktop} from '../style/helpers'
import {Spacing} from '../style/spacing'

export interface GridStyleProps {
  numColumns: number
}

export const GridStyle = cssRule((props: GridStyleProps) => ({
  width: '100%'
}))

export interface GridProps {
  numColumns: number
  children?: ReactNode
}

export function Grid({numColumns, children}: GridProps) {
  const {css} = useStyle<GridStyleProps>({numColumns})

  let childrenArray = Children.toArray(children)

  const numMissingChildren =
    childrenArray.length % numColumns == 0 ? 0 : numColumns - (childrenArray.length % numColumns)

  childrenArray = [...childrenArray, ...new Array(numMissingChildren)]

  const rows = childrenArray.reduce<ReactNode[][]>((acc, child, index) => {
    const rowIndex = Math.floor(index / numColumns)
    const columnIndex = index % numColumns

    if (!acc[rowIndex]) {
      acc[rowIndex] = []
    }

    acc[rowIndex][columnIndex] = child

    return acc
  }, [])

  return (
    <div className={css(GridStyle)}>
      {rows.map((columns, index) => (
        <Row key={index}>
          {columns.map((child, index) => (
            <Column key={index}>{child}</Column>
          ))}
        </Row>
      ))}
    </div>
  )
}

export const RowStyle = cssRule(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%'
}))

export interface RowProps {
  children?: ReactNode
}

export function Row({children}: RowProps) {
  const {css} = useStyle()
  return <div className={css(RowStyle)}>{children}</div>
}

export const ColumnStyle = cssRule(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',

  overflow: 'hidden',
  padding: pxToRem(Spacing.ExtraSmall),

  ...whenDesktop({
    flex: 1
  })
}))

export interface ColumnProp {
  children?: ReactNode
}

export function Column({children}: ColumnProp) {
  const {css} = useStyle()
  return <div className={css(ColumnStyle)}>{children}</div>
}
