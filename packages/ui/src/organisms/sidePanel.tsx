import React, {ReactNode} from 'react'
import {MaterialIconArrowForward} from '@karma.run/icons'

import {IconType} from '../atoms/icon'
import {IconLabelButton} from '../atoms/iconLabelButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, Spacing, ZIndex} from '../style/helpers'

const sidePanelWidth = 480
const SidePanelStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(sidePanelWidth),
  zIndex: ZIndex.Sidebar,
  height: '1000px',
  backgroundColor: 'rgba(255,255,255,0.96)',
  backdropFilter: 'blur(2px)',
  boxShadow: '0 0 6px 0 rgba(0,0,0,0.5)'
}))

const SidePanelContentSytle = cssRuleWithTheme(({theme}) => ({
  padding: pxToRem(Spacing.Small)
}))

export interface SidePanelProps extends SidePanelHeaderProps {
  readonly children: ReactNode
}

export function SidePanel({title, action, onClose, children}: SidePanelProps) {
  const css = useThemeStyle()
  return (
    <div className={css(SidePanelStyle)}>
      <SidePanelHeader title={title} action={action} onClose={onClose} />
      <div className={css(SidePanelContentSytle)}>{children}</div>
    </div>
  )
}

const SidePanelHeaderStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  display: 'flex',
  width: '100%',
  height: pxToRem(60),

  '> button': {
    zIndex: 1
  },

  '> h4': {
    fontSize: pxToRem(FontSize.Medium),
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: pxToRem(-70),
    width: '100%'
  }
}))

export interface SidePanelHeaderProps {
  title: string
  action?: {icon: IconType; label: string; onClick(): void}
  onClose(): void
}

export function SidePanelHeader({title, action, onClose}: SidePanelHeaderProps) {
  const css = useThemeStyle()
  return (
    <div className={css(SidePanelHeaderStyle)}>
      <IconLabelButton icon={MaterialIconArrowForward} label={'Close'} onClick={onClose} />
      <h4>{title}</h4>
      {action && (
        <IconLabelButton icon={action.icon} label={action.label} onClick={action.onClick} />
      )}
    </div>
  )
}

const SidePanelTitleStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,
  width: '108%',
  height: pxToRem(30),
  color: theme.colors.grayDark,
  fontSize: pxToRem(FontSize.Small),
  lineHeight: pxToRem(30),
  marginLeft: '-4%',
  paddingLeft: pxToRem(20),
  marginBottom: pxToRem(Spacing.Small)
}))

export interface SidePanelTitleProps {
  title: string
}

export function SidePanelTitle({title}: SidePanelTitleProps) {
  const css = useThemeStyle()
  return <div className={css(SidePanelTitleStyle)}>{title}</div>
}
