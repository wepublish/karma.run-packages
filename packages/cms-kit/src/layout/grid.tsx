import React, {ReactNode, Children, createContext, useContext} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {pxToRem, Spacing} from '../style/helpers'

interface GridStyleProps {
  readonly spacing: Spacing
}

const GridStyle = cssRule<GridStyleProps>(({spacing}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: `calc(100% + ${pxToRem(spacing)})`,
  height: '100%',
  margin: pxToRem(-spacing)
}))

export interface GridProps {
  readonly children?: ReactNode
  readonly spacing?: Spacing
}

export function Grid({children, spacing = Spacing.Tiny}: GridProps) {
  const {css} = useStyle<GridStyleProps>({spacing})

  return (
    <GridContext.Provider value={{spacing}}>
      <div className={css(GridStyle)}>{children}</div>
    </GridContext.Provider>
  )
}

interface ColumnStyleProps {
  readonly flexBasis: string
  readonly spacing: Spacing
}

const ColumnStyle = cssRule<ColumnStyleProps>(({flexBasis, spacing}) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis
}))

const ColumnItemStyle = cssRule<ColumnStyleProps>(({spacing}) => ({
  width: '100%',
  height: '100%',
  padding: pxToRem(spacing)
}))

export interface GridColumnProp {
  readonly ratio?: number
  readonly children?: ReactNode
}

export function Column({ratio, children}: GridColumnProp) {
  const {spacing} = useContext(GridContext)
  const {css} = useStyle<ColumnStyleProps>({
    flexBasis: ratio ? `${(ratio * 100).toFixed(2)}%` : '100%',
    spacing
  })

  return (
    <div className={css(ColumnStyle)}>
      {Children.map(children, child => (
        <div className={css(ColumnItemStyle)}>{child}</div>
      ))}
    </div>
  )
}

export interface GridContextState {
  readonly spacing: Spacing
}

export const GridContext = createContext<GridContextState>({spacing: Spacing.None})
