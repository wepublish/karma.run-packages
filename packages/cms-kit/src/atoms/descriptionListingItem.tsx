import React, {ReactNode, Children} from 'react'
import {cssRule, useStyle} from '@karma.run/react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {FontSize, pxToRem, Spacing} from '../style/helpers'

export const DescriptionListingStyle = cssRule({
  display: 'block',
  width: '100%',
  fontSize: pxToRem(FontSize.Small)
})

export interface DescriptionListingProps {
  readonly children?: ReactNode
}

export function DescriptionListing({children}: DescriptionListingProps) {
  const {css} = useThemeStyle()
  return <dl className={css(DescriptionListingStyle)}>{children}</dl>
}

const DescriptionListingItemLabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.grayDark,
  float: 'left',
  verticalAlign: 'middle'
}))

const DescriptionListingItemValueStyle = cssRule({
  width: '60%',
  marginLeft: '40%',
  verticalAlign: 'middle',
  textAlign: 'right',
  marginTop: pxToRem(Spacing.ExtraSmall),
  marginBottom: pxToRem(Spacing.ExtraSmall)
})

export interface DescriptionListingItemProps {
  readonly label: string
  readonly value: string
}

export function DescriptionListingItem({label, value}: DescriptionListingItemProps) {
  const {css} = useThemeStyle()
  return (
    <React.Fragment>
      <dt className={css(DescriptionListingItemLabelStyle)}>{label}</dt>
      <dd className={css(DescriptionListingItemValueStyle)}>{value}</dd>
    </React.Fragment>
  )
}
