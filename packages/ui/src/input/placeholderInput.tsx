import React, {ReactNode} from 'react'
import {MaterialIconAdd} from '@karma.run/icons'

import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {IconButton} from '../buttons/iconButton'

const PlaceholderStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PlaceholderInput' : undefined,

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
  children?: ReactNode

  /**
   * Called when the add button is clicked.
   */
  onAddClick?: () => void
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
      <IconButton
        variant="large"
        icon={MaterialIconAdd}
        onClick={() => onAddClick && onAddClick()}
      />
    </div>
  )
}
