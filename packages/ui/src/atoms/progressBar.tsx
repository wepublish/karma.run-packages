import React from 'react'
import {MaterialIconClose} from '@karma.run/icons'

import {OptionButtonSmall} from './optionButtonSmall'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, BorderRadius, TransitionDuration} from '../style/helpers'

const ProgressBarStyle = cssRuleWithTheme(({theme}) => ({
  width: '100%'
}))

const ProgressStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  position: 'relative',
  height: '20px',
  borderRadius: pxToRem(BorderRadius.Medium)
}))

const FillerStyle = cssRuleWithTheme<{progress: number}>(({progress, theme}) => ({
  backgroundColor: theme.colors.gray,
  height: '100%',
  borderRadius: pxToRem(BorderRadius.Medium),
  width: `${progress}%`,
  transition: TransitionDuration.Slow
}))

/**
 *
 * Progress Bar
 * progress in percentage
 */
export interface ProgressBarProps {
  readonly progress: number
  onCancel?(): void
}

export function ProgressBar({progress, onCancel}: ProgressBarProps) {
  const css = useThemeStyle({progress: progress})
  return (
    <div className={css(ProgressBarStyle)}>
      <div className={css(ProgressStyle)}>
        <div className={css(FillerStyle)} />
      </div>
      {progress}%{onCancel && <OptionButtonSmall icon={MaterialIconClose} onClick={onCancel} />}
    </div>
  )
}
