import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {SelectChangeEvent, Select} from './select'
import {pxToRem, FontSize, Spacing} from '../style/helpers'

const CheckboxContainerStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  minHeight: pxToRem(30)
}))

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  width: 0,
  height: 0,

  ':checked ~ span': {
    backgroundColor: theme.colors.action,
    borderColor: theme.colors.actionDark
  },
  ':checked ~ span:after': {
    display: 'block',
    top: '1px',
    left: '6px',
    width: '6px',
    height: '13px',
    border: `solid ${theme.colors.white}`,
    borderWidth: '0  2px 2px 0',
    transform: 'rotate(42deg)'
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  borderRadius: '2px',
  backgroundColor: theme.colors.light,
  border: `1px solid ${theme.colors.grayDark}`,

  ':after': {
    content: '""',
    position: 'absolute',
    display: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  fontSize: pxToRem(FontSize.Medium),
  color: theme.colors.dark,
  marginLeft: pxToRem(Spacing.Medium)
}))

export interface CheckboxProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectChangeEvent): void
  readonly className?: string
}

export function Checkbox(props: CheckboxProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(CheckboxContainerStyle)}>
      <Select
        id={props.id}
        style={CheckboxStyle}
        type="checkbox"
        checked={props.isChecked}
        onSelectChange={props.onChange}
      />
      <span className={css(CheckMarkStyle)} />
      <label className={css(LabelStyle)} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )
}
