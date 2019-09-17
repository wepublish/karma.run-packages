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
  children?: ReactNode
}

export function Placeholder({children}: PlaceholderProps) {
  const {css} = useThemeStyle()

  if (children) {
    return <>{children}</>
  }

  return (
    <div className={css(PlaceholderStyle)}>
      <OptionButton icon={IconType.Add} />
    </div>
  )
}
