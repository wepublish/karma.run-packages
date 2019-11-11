import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule} from '@karma.run/react'
import {pxToRem, FontSize} from '../style/helpers'
import {FieldProps} from '../input/fields/types'
import {BaseInput, InputType} from '../atoms/baseInput'
import {BaseTextArea} from '../atoms/baseTextArea'

export const HeaderBlockStyle = cssRuleWithTheme(({theme}) => ({
  '& > *': {
    display: 'block',
    textAlign: 'center'
  }
}))

const HeaderBlockTitleStyle = cssRule({
  fontSize: pxToRem(FontSize.ExtraLarge),
  fontWeight: 'bold'
})

const HeaderBlockLeadStyle = cssRuleWithTheme(({theme}) => ({
  fontSize: pxToRem(FontSize.Medium),
  minHeight: '60px'
}))

export function HeaderBlock({value, onChange}: FieldProps<{title: string; lead: string}>) {
  const css = useThemeStyle()

  const placeholderLead =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam consetetur sadipscing elitr, sed diam nonumy eirmod'

  return (
    <div className={css(HeaderBlockStyle)}>
      <BaseInput
        type={InputType.Text}
        placeholder={'Article title'}
        style={HeaderBlockTitleStyle}
        value={value.title}
        onChange={inputVal => onChange({title: inputVal.target.value, lead: value.lead})}
      />
      <BaseTextArea
        placeholder={placeholderLead}
        style={HeaderBlockLeadStyle}
        value={value.lead}
        onChange={textVal => onChange({title: value.title, lead: textVal})}
      />
    </div>
  )
}
