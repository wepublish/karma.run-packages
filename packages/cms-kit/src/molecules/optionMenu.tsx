import React from 'react'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {OverlayMenu, MenuItem} from './overlayMenu'
import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon, IconSize} from '../atoms/icon'
import {pxToEm} from '../style/helpers'

const OptionMenuStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({}))

const OptionButtonStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({
  height: '1.5em',
  width: '1.5em',
  fontSize: pxToEm(IconSize.Small),

  backgroundColor: isOpen ? theme.colors.grayLight : '',
  border: 'none',
  borderRadius: '100%',

  '&:hover:enabled': {
    fill: theme.colors.action
  }
}))

export interface OptionMenuProps {
  isOpen: boolean
  onAddClick(): void
  menuItems: Array<MenuItem>
}

export function OptionMenu({isOpen, menuItems, onAddClick}: OptionMenuProps) {
  const {css} = useThemeStyle({isOpen: isOpen})

  return (
    <div className={css(OptionMenuStyle)}>
      <BaseButton style={OptionButtonStyle} styleProps={{isOpen: isOpen}} onClick={onAddClick}>
        <Icon type={IconType.More} />
      </BaseButton>
      {isOpen && <OverlayMenu inline={true} menuItems={menuItems} />}
    </div>
  )
}
