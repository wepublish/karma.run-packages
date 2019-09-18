import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {Select, SelectChangeEvent, BaseSelectProps} from './select'
import {toArray} from '../utility'

const ToggleStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',
  appearance: 'none',
  outline: 'none',
  width: pxToRem(50),
  height: pxToRem(30),
  backgroundColor: '#ffffff',
  border: `${pxToRem(1)} solid ${theme.colors.gray}`,
  borderRadius: pxToRem(50),
  boxShadow: `inset -${pxToRem(20)} 0 0 0 #f4f4f4`,
  transitionDuration: '200ms',
  cursor: 'pointer',

  '&:after': {
    content: '',
    position: 'absolute',
    top: pxToRem(1),
    left: pxToRem(1),
    width: pxToRem(26),
    height: pxToRem(26),
    backgroundColor: 'transparent',
    borderRadius: '50%',
    border: `${pxToRem(1)} solid ${theme.colors.gray}`,
    boxShadow: '2px 4px 6px rgba(0,0,0,0.2)'
  },

  '&:checked': {
    borderColor: theme.colors.successDark,
    boxShadow: `inset ${pxToRem(20)} 0 0 0 ${theme.colors.success}`
  },

  '&:checked:after': {
    left: pxToRem(20),
    border: `${pxToRem(1)} solid ${theme.colors.successDark}`,
    boxShadow: `-2px 4px 3px rgba(0,0,0,0.05)`
  }
}))

export interface ToggleProps extends BaseSelectProps {}

export function Toggle({id, checked, onSelectChange, style, styleProps}: ToggleProps) {
  const {css} = useThemeStyle()
  return (
    <Select
      id={id}
      style={[ToggleStyle, ...toArray(style)]}
      styleProps={styleProps}
      checked={checked}
      type="checkbox"
      onSelectChange={onSelectChange}
    />
  )
}
