import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {OptionButton} from './optionButton'
import {IconType} from './icon'

export const PlaceholderStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.light,
  width: '100%'
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
