import React from 'react'
import {OptionButtonSmall} from './optionButtonSmall'
import {useThemeStyle, cssRuleWithTheme} from '../../style/themeContext'
import {MaterialIconAdd} from '@karma.run/icons'
import {ZIndex} from '../../style/helpers'

interface AddBlockButtonStyleProps {
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
    zIndex: ZIndex.Default,
    display: 'block',

    top: '50%',

    width: '100%',
    height: '1px',

    backgroundColor: theme.colors.action
  }
}))

const AddBlockButtonWrapperStyle = cssRuleWithTheme(() => ({
  zIndex: ZIndex.Default
}))

export interface AddBlockButtonProps {
  readonly active?: boolean
  onClick(): void
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
