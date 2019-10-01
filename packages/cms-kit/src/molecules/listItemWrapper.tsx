import React, {ReactNode} from 'react'
import {Card} from '../atoms/card'
import {useStyle, cssRule} from '@karma.run/react'
import {IconType, Icon} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {pxToRem, Spacing} from '../style/helpers'

const ListItemWrapperStyle = cssRule({
  display: 'flex',
  width: '100%'
})

const ListItemWrapperActionStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  marginRight: pxToRem(Spacing.ExtraSmall)
})

const ListItemWrapperAccessoryStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: pxToRem(Spacing.ExtraSmall)
})

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
  const {css} = useStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <OptionButtonSmall
          title="Delete"
          icon={IconType.Delete}
          onClick={onDelete}
          disabled={onDelete == null}
        />
        <OptionButtonSmall
          title="Move Up"
          icon={IconType.ChevronUp}
          onClick={onMoveUp}
          disabled={onMoveUp == null}
        />
        <OptionButtonSmall
          title="Move Down"
          icon={IconType.ChevronDown}
          onClick={onMoveDown}
          disabled={onMoveDown == null}
        />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card>{children}</Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon type={icon} />}</div>
    </div>
  )
}
