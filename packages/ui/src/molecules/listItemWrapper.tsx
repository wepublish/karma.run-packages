import React, {ReactNode} from 'react'

import {cssRule} from '@karma.run/react'

import {
  MaterialIconDeleteOutlined,
  MaterialIconKeyboardArrowDown,
  MaterialIconKeyboardArrowUp
} from '@karma.run/icons'

import {Card} from '../atoms/card'
import {Icon, IconType} from '../atoms/icon'
import {OptionButtonSmall} from '../input/buttons/optionButtonSmall'
import {pxToRem, Spacing} from '../style/helpers'
import {Box} from '../layout/box'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

const ListItemWrapperStyle = cssRule({
  display: 'flex',
  width: '100%'
})

const ListItemWrapperActionStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  width: pxToRem(24),
  marginRight: pxToRem(Spacing.ExtraSmall)
})

const ListItemWrapperAccessoryStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: pxToRem(24),
  marginLeft: pxToRem(Spacing.ExtraSmall),
  fontSize: pxToRem(24),
  fill: theme.colors.gray
}))

const ListItemWrapperContentStyle = cssRule({
  display: 'flex',
  width: '100%'
})

export interface ListItemWrapperProps {
  readonly children?: ReactNode
  readonly accessory?: ReactNode // TODO
  readonly icon?: IconType

  onDelete?(): void
  onMoveUp?(): void
  onMoveDown?(): void
}

export function ListItemWrapper({
  children,
  icon,
  onDelete,
  onMoveUp,
  onMoveDown
}: ListItemWrapperProps) {
  const css = useThemeStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <OptionButtonSmall
          title="Delete"
          icon={MaterialIconDeleteOutlined}
          onClick={onDelete}
          disabled={onDelete == null}
        />
        <Box flexGrow={1} />
        <Box marginTop={Spacing.ExtraSmall} marginBottom={Spacing.Tiny}>
          <OptionButtonSmall
            title="Move Up"
            icon={MaterialIconKeyboardArrowUp}
            onClick={onMoveUp}
            disabled={onMoveUp == null}
          />
        </Box>
        <Box marginBottom={Spacing.ExtraSmall}>
          <OptionButtonSmall
            title="Move Down"
            icon={MaterialIconKeyboardArrowDown}
            onClick={onMoveDown}
            disabled={onMoveDown == null}
          />
        </Box>
        <Box flexGrow={1} />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card>
          <Box padding={Spacing.ExtraSmall}>{children}</Box>
        </Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon element={icon} />}</div>
    </div>
  )
}
