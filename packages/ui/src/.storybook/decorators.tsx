import React, {ReactNode} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {StoryFn} from '@storybook/addons'
import {Spacing} from '../style/helpers'

interface CenterLayoutStyleProps {
  readonly scale?: number
}

const CenterLayoutStyle = cssRule({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  minHeight: '100%'
})

const CenterLayoutContentStyle = cssRule(({scale}: CenterLayoutStyleProps) => ({
  width: scale ? `${scale * 100}%` : undefined,
  margin: Spacing.Large
}))

export interface CenterLayoutProps {
  readonly scale?: number
  readonly children?: ReactNode
}

export function CenterLayout({scale, children}: CenterLayoutProps) {
  const style = useStyle({scale})

  return (
    <div className={style(CenterLayoutStyle)}>
      <div className={style(CenterLayoutContentStyle)}>{children}</div>
    </div>
  )
}

export function centerLayoutDecorator(scale?: number) {
  return (story: StoryFn<ReactNode>) => {
    return <CenterLayout scale={scale}>{story()}</CenterLayout>
  }
}
