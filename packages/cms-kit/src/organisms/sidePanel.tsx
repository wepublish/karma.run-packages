import React, {ReactNode} from 'react'
import {IconType} from '../atoms/icon'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {TransitionDuration} from '../style/transition'

export const sidePanelWidth = 480
export const SidePanelStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(sidePanelWidth)
}))

export interface SidePanelProps extends SidePanelHeaderProps {
  readonly children: ReactNode
}

export function SidePanel({title, action, onClose, children}: SidePanelProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(SidePanelStyle)}>
      <SidePanelHeader title={title} action={action} onClose={onClose} />
      {children}
    </div>
  )
}

/**
 *
 * Side Panel Header
 */
export const SidePanelHeaderStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  display: 'flex',
  width: '100%'
}))

export interface SidePanelHeaderProps {
  title: string
  action?: {icon: IconType; label: string; onClick(): void}
  onClose(): void
}

export function SidePanelHeader({title, action, onClose}: SidePanelHeaderProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(SidePanelHeaderStyle)}>
      <IconLabelButton icon={IconType.ArrowRight} label={'Close'} onClick={onClose} />
      <div>{title}</div>
      {action && (
        <IconLabelButton icon={action.icon} label={action.label} onClick={action.onClick} />
      )}
    </div>
  )
}

/**
 *
 * Side Panel Title
 */
export const SidePanelTitleStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  width: '100%'
}))

export interface SidePanelTitleProps {
  title: string
}

export function SidePanelTitle({title}: SidePanelTitleProps) {
  const {css} = useThemeStyle()
  return <div className={css(SidePanelTitleStyle)}>{title}</div>
}
