import React from 'react'
import {OptionButtonSmall} from './optionButtonSmall'
import {useThemeStyle, cssRuleWithTheme} from '../../style/themeContext'
import {MaterialIconAdd} from '@karma.run/icons'
import {ZIndex} from '../../style/helpers'

interface AddBlockButtonStyleProps {
  readonly active: boolean
  readonly subtle: boolean
}

const AddBlockButtonStyle = cssRuleWithTheme<AddBlockButtonStyleProps>(
  ({theme, active, subtle}) => ({
    display: 'flex',
    position: 'relative',

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',

    '&::before': {
      content: '""',

      position: 'absolute',
      zIndex: ZIndex.Default,
      display: 'block',

      top: '50%',

      width: '100%',
      height: '1px',

      backgroundColor: subtle ? theme.colors.grayLight : theme.colors.action
    }
  })
)

const AddBlockButtonWrapperStyle = cssRuleWithTheme(() => ({
  zIndex: ZIndex.Default
}))

export interface AddBlockButtonProps {
  readonly active?: boolean // TODO: Add highlighted prop to OptionButtonSmall
  readonly subtle?: boolean
  onClick(): void
}

export function AddBlockButton({onClick, active = false, subtle = false}: AddBlockButtonProps) {
  const css = useThemeStyle<AddBlockButtonStyleProps>({active, subtle})

  return (
    <div className={css(AddBlockButtonStyle)} onClick={() => onClick()}>
      <div className={css(AddBlockButtonWrapperStyle)}>
        <OptionButtonSmall title="Add Block" icon={MaterialIconAdd} onClick={() => onClick()} />
      </div>
    </div>
  )
}
