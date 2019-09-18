import React, {ReactNode} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {StoryFn} from '@storybook/addons'

import {pxToRem} from '../style/helpers'

export interface CenterLayoutStyleProps {
  scale: number
}

export const CenterLayoutStyle = cssRule({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%'
})

export const CenterLayoutContentStyle = cssRule(({scale}: CenterLayoutStyleProps) => ({
  padding: pxToRem(20),
  margin: pxToRem(20),
  minWidth: `${scale * 100}%`,
  border: '1px dashed rgba(0,0,0, 0.05)'
}))

export interface CenterLayoutProps {
  minWidthFactor: number
  children?: ReactNode
}

export function CenterLayout({minWidthFactor: scale, children}: CenterLayoutProps) {
  const {css} = useStyle({scale})

  return (
    <div className={css(CenterLayoutStyle)}>
      <div className={css(CenterLayoutContentStyle)}>{children}</div>
    </div>
  )
}

export function centerLayoutDecorator(minWidthFactor: number = 0) {
  return (story: StoryFn<ReactNode>) => {
    return <CenterLayout minWidthFactor={minWidthFactor}>{story()}</CenterLayout>
  }
}

export interface FontSizeStyleProps {
  fontSize: number
}

export const FontSizeStyle = cssRule(({fontSize}: FontSizeStyleProps) => ({
  fontSize: pxToRem(fontSize)
}))

export interface FontSizeProps {
  fontSize: number
  children?: ReactNode
}

export function FontSize({fontSize, children}: FontSizeProps) {
  const {css} = useStyle({fontSize})

  return <div className={css(FontSizeStyle)}>{children}</div>
}

export function fontSizeDecorator(fontSize: number = 24) {
  return (story: StoryFn<ReactNode>) => {
    return <FontSize fontSize={fontSize}>{story()}</FontSize>
  }
}

export const InfoBoxStyle = cssRule(() => ({
  backgroundColor: '#f7fcff',
  display: 'inline-block',
  margin: pxToRem(10),
  textAlign: 'center',
  minWidth: pxToRem(80),
  paddingTop: pxToRem(20),
  paddingBottom: pxToRem(5)
}))

export const InfoBoxTextStyle = cssRule(() => ({
  paddingBottom: pxToRem(5),
  paddingTop: pxToRem(5),
  fontSize: '1.2rem'
}))

export const InfoBoxContentStyle = cssRule(() => ({
  display: 'inline-block'
}))

export interface InfoBoxProps {
  infoText: string
  children: ReactNode
  fontSize?: number
  elementSize?: number
}

export function InfoBox({infoText, children}: InfoBoxProps) {
  const {css} = useStyle()

  return (
    <div className={css(InfoBoxStyle)}>
      <div className={css(InfoBoxContentStyle)}>{children}</div>
      <div className={css(InfoBoxTextStyle)}>{infoText}</div>
    </div>
  )
}

export function infoBoxDecorator(infoText: string, fontSize: number = 12) {
  return (story: StoryFn<ReactNode>) => {
    return (
      <InfoBox infoText={infoText} fontSize={fontSize}>
        {story()}
      </InfoBox>
    )
  }
}
