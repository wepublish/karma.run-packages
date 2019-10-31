import React, {ReactNode} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {StoryFn} from '@storybook/addons'

import {pxToRem, Spacing, FontSize} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

export interface CenterLayoutStyleProps {
  scale?: number
}

const CenterLayoutStyle = cssRule({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  minHeight: '100%'
})

const CenterLayoutContentStyle = cssRule(({scale}: CenterLayoutStyleProps) => ({
  padding: pxToRem(20),
  margin: pxToRem(20),
  width: scale ? `${scale * 100}%` : undefined,
  border: '1px dashed rgba(0,0,0, 0.05)'
}))

export interface CenterLayoutProps {
  minWidthFactor?: number
  children?: ReactNode
}

export function CenterLayout({minWidthFactor: scale, children}: CenterLayoutProps) {
  const style = useStyle({scale})

  return (
    <div className={style(CenterLayoutStyle)}>
      <div className={style(CenterLayoutContentStyle)}>{children}</div>
    </div>
  )
}

export function centerLayoutDecorator(minWidthFactor?: number) {
  return (story: StoryFn<ReactNode>) => {
    return <CenterLayout minWidthFactor={minWidthFactor}>{story()}</CenterLayout>
  }
}

export interface FontSizeStyleProps {
  fontSize: number
}

const FontSizeStyle = cssRule(({fontSize}: FontSizeStyleProps) => ({
  fontSize: pxToRem(fontSize),
  width: 'inherit',
  height: 'inherit'
}))

export interface FontSizeProps {
  fontSize: number
  children?: ReactNode
}

export function FontSizeContainer({fontSize, children}: FontSizeProps) {
  const style = useStyle({fontSize})
  return <div className={style(FontSizeStyle)}>{children}</div>
}

export function fontSizeDecorator(fontSize: number = 24) {
  return (story: StoryFn<ReactNode>) => {
    return <FontSizeContainer fontSize={fontSize}>{story()}</FontSizeContainer>
  }
}

const InfoBoxStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  display: 'inline-block',
  textAlign: 'center',
  minWidth: pxToRem(80),

  margin: pxToRem(Spacing.ExtraSmall),
  padding: pxToRem(Spacing.ExtraSmall)
}))

const InfoBoxLabelStyle = cssRuleWithTheme(({theme}) => ({
  marginTop: pxToRem(Spacing.Tiny),
  fontSize: pxToRem(FontSize.Small),
  color: theme.colors.gray
}))

export interface InfoBoxProps {
  readonly label: string
  readonly children: ReactNode
}

export function InfoBox({label, children}: InfoBoxProps) {
  const css = useThemeStyle()

  return (
    <div className={css(InfoBoxStyle)}>
      {children}
      <div className={css(InfoBoxLabelStyle)}>{label}</div>
    </div>
  )
}

const DarkBackgroundStyle = cssRule({
  backgroundColor: '#222222',
  width: '100%',
  height: '100%',
  padding: '20px',
  borderRadius: '5px'
})

export interface DarkBackgroundProps {
  children?: ReactNode
}

export function DarkBackground({children}: DarkBackgroundProps) {
  const css = useStyle()

  return <div className={css(DarkBackgroundStyle)}>{children}</div>
}

export function darkBackgroundDecorator() {
  return (story: StoryFn<ReactNode>) => {
    return <DarkBackground>{story()}</DarkBackground>
  }
}
