import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../../style/themeContext'
import {OptionButton} from '../buttons/optionButton'
import {MaterialIconAdd} from '@karma.run/icons'

const PlaceholderStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.light
}))

export interface PlaceholderInputProps {
  /**
   * Setting children will directly render them.
   */
  readonly children?: ReactNode

  /**
   * Called when the add button is clicked.
   */
  onAddClick?(): void
}

/**
 * A placeholder for a block.
 */
export function PlaceholderInput({children, onAddClick}: PlaceholderInputProps) {
  const css = useThemeStyle()

  if (children) {
    return <>{children}</>
  }

  return (
    <div className={css(PlaceholderStyle)}>
      <OptionButton icon={MaterialIconAdd} onClick={() => onAddClick && onAddClick()} />
    </div>
  )
}
