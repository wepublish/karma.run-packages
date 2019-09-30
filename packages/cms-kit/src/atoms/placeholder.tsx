import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {OptionButton} from './optionButton'
import {IconType} from './icon'
import {pxToEm} from '../style/helpers'

export const PlaceholderStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  minWidth: pxToEm(230),
  minHeight: pxToEm(260),
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.light
}))

export interface PlaceholderProps {
  /**
   * Setting children will directly render them.
   */
  readonly children?: ReactNode

  /**
   * Called when the add button is clicked.
   */
  onAdd?(): void
}

/**
 * A placeholder for a component.
 */
export function Placeholder({children, onAdd}: PlaceholderProps) {
  const {css} = useThemeStyle()

  if (children) {
    return <>{children}</>
  }

  return (
    <div className={css(PlaceholderStyle)}>
      <OptionButton icon={IconType.Add} onClick={() => onAdd && onAdd()} />
    </div>
  )
}
