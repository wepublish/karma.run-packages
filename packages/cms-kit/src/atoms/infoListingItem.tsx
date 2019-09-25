import React from 'react'
import {cssRule, useStyle} from '@karma.run/react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

export const InfoListingItemStyle = cssRule({
  width: '100%'
})

const InfoListingItemLabelStyle = cssRuleWithTheme(({theme}) => ({
  float: 'left',
  color: theme.colors.gray
}))

const InfoListingItemValueStyle = cssRule({
  float: 'right'
})

const ClearFloat = cssRule({
  clear: 'both'
})

export interface InfoListingItemProps {
  readonly label: string
  readonly value: string
}

export function InfoListingItem({label, value}: InfoListingItemProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(InfoListingItemStyle)}>
      <div className={css(InfoListingItemLabelStyle)}>{label}</div>
      <div className={css(InfoListingItemValueStyle)}>{value}</div>
      <div className={css(ClearFloat)} />
    </div>
  )
}
