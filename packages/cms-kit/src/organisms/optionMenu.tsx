import React, {useState} from 'react'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {OverlayMenu, MenuItem} from '../molecules/overlayMenu'
import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon} from '../atoms/icon'
import {pxToEm} from '../style/helpers'
import {FontSize} from '../style/fontSize'

interface OptionMenuStyleProps {
  isOpen: boolean
}

const OptionMenuStyle = cssRuleWithTheme<OptionMenuStyleProps>(({isOpen, theme}) => ({}))

const OptionButtonStyle = cssRuleWithTheme<OptionMenuStyleProps>(({isOpen, theme}) => ({
  height: '1.5em',
  width: '1.5em',
  fontSize: pxToEm(FontSize.Medium),

  backgroundColor: isOpen ? theme.colors.grayLight : undefined,
  borderRadius: '100%',

  '&:hover:enabled': {
    fill: theme.colors.action
  }
}))

export interface OptionMenuProps {
  readonly menuItems: MenuItem[]
  onMenuItemClick(item: MenuItem): void
}

export function OptionMenu({menuItems, onMenuItemClick}: OptionMenuProps) {
  const [isOpen, setOpen] = useState(false)
  const {css} = useThemeStyle({isOpen})

  return (
    <div className={css(OptionMenuStyle)}>
      <BaseButton style={OptionButtonStyle} styleProps={{isOpen}} onClick={() => setOpen(!isOpen)}>
        <Icon type={IconType.More} />
      </BaseButton>
      {isOpen && (
        <OverlayMenu
          inline={true}
          menuItems={menuItems}
          onMenuItemClick={item => {
            setOpen(false)
            onMenuItemClick(item)
          }}
        />
      )}
    </div>
  )
}
