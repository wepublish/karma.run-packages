import React from 'react'
import {IconType} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

export const AddBlockButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  position: 'relative',

  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',

  '&::before': {
    content: '""',

    position: 'absolute',
    display: 'block',

    top: '50%',

    width: '100%',
    height: '1px',

    backgroundColor: theme.colors.action
  }
}))

export const AddBlockButtonWrapperStyle = cssRuleWithTheme(() => ({
  zIndex: 1,
  top: '50%',
  left: '50%'
}))

export interface AddBlockButtonProps {
  onClick(): void
}

export function AddBlockButton({onClick}: AddBlockButtonProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(AddBlockButtonStyle)}>
      <div className={css(AddBlockButtonWrapperStyle)}>
        <OptionButtonSmall title="Add Block" icon={IconType.Add} onClick={() => onClick()} />
      </div>
    </div>
  )
}
