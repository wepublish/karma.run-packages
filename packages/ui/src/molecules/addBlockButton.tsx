import React from 'react'
import {OptionButtonSmall} from '../input/optionButtonSmall'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {MaterialIconAdd} from '@karma.run/icons'

export interface AddBlockButtonStyleProps {
  active: boolean
}

const AddBlockButtonStyle = cssRuleWithTheme<AddBlockButtonStyleProps>(({theme, active}) => ({
  display: 'flex',
  position: 'relative',

  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  fill: active ? theme.colors.dark : undefined,

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

const AddBlockButtonWrapperStyle = cssRuleWithTheme(() => ({
  zIndex: 1,
  top: '50%',
  left: '50%'
}))

export interface AddBlockButtonProps {
  onClick(): void
  active?: boolean
}

export function AddBlockButton({onClick, active = false}: AddBlockButtonProps) {
  const css = useThemeStyle<AddBlockButtonStyleProps>({active})

  return (
    <div className={css(AddBlockButtonStyle)}>
      <div className={css(AddBlockButtonWrapperStyle)}>
        <OptionButtonSmall title="Add Block" icon={MaterialIconAdd} onClick={() => onClick()} />
      </div>
    </div>
  )
}
