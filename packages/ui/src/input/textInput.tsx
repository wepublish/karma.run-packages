import React, {InputHTMLAttributes, forwardRef} from 'react'

import {IconElement, Icon} from '../data/icon'

import {themeMiddleware, Theme} from '../style/themeContext'
import {
  FontSize,
  TransitionDuration,
  LineHeight,
  Spacing,
  MarginProps,
  extractStyleProps,
  WidthProps,
  FlexChildProps
} from '../style/helpers'
import {cssRule, styled} from '@karma.run/react'

interface TextInputStyleProps {
  readonly hasError: boolean
  readonly hasIcon: boolean
  readonly theme: Theme
}

interface TextInputLayoutProps extends MarginProps, WidthProps, FlexChildProps {}

const IconStyle = cssRule(() => ({
  position: 'absolute'
}))

const TextInputWrapper = styled('div', (props: TextInputLayoutProps) => ({
  paddingTop: 16,
  ...props
}))

const TextInputLabelWrapper = styled(
  'label',
  ({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    fontSize: FontSize.Medium,
    fill: theme.colors.dark
  }),
  themeMiddleware
)

const TextInputLabel = styled(
  'span',
  ({hasError, theme}: TextInputStyleProps) => ({
    color: hasError ? theme.colors.alert : theme.colors.gray,
    position: 'absolute',
    top: -FontSize.Medium,
    left: 0,
    fontSize: FontSize.Small,
    opacity: 1,
    transform: 'translateY(0%)',
    transitionProperty: 'transform, opacity, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

const TextInputElement = styled(
  'input',
  ({hasIcon, theme}: TextInputStyleProps) => ({
    width: '100%',

    color: theme.colors.dark,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: LineHeight.Default,

    border: 'none',
    borderBottom: `1px solid ${theme.colors.gray}`,
    backgroundColor: 'transparent',

    transitionProperty: 'border-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    paddingLeft: hasIcon ? FontSize.Medium + Spacing.Tiny : undefined,

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':focus:valid': {
      borderColor: theme.colors.action
    },

    ':focus:valid + span': {
      color: theme.colors.action
    },

    ':focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':focus:invalid + span': {
      color: theme.colors.alert
    },

    ':invalid': {
      borderColor: theme.colors.alert
    },

    ':disabled': {
      opacity: 0.5,
      borderBottomStyle: 'dashed'
    },

    ':invalid + span': {
      color: theme.colors.alert
    },

    ':placeholder-shown + span': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + span': {
      color: theme.colors.action
    }
  }),
  themeMiddleware
)

const TextInputInfo = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const TextInputError = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface TextInputProps
  extends MarginProps,
    WidthProps,
    FlexChildProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'width'> {
  readonly label?: string
  readonly description?: string
  readonly errorMessage?: string
  readonly icon?: IconElement
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {label, description, errorMessage, icon, ...props},
  ref
) {
  const styleProps = {hasError: errorMessage != undefined, hasIcon: icon != undefined}
  const [layoutProps, elementProps] = extractStyleProps(props)

  return (
    <TextInputWrapper styleProps={layoutProps}>
      <TextInputLabelWrapper>
        {icon && <Icon element={icon} style={IconStyle} />}
        <TextInputElement ref={ref} placeholder={label} styleProps={styleProps} {...elementProps} />
        <TextInputLabel styleProps={styleProps}>{label}</TextInputLabel>
      </TextInputLabelWrapper>
      {description && <TextInputInfo>{description}</TextInputInfo>}
      {errorMessage && <TextInputError>{errorMessage}</TextInputError>}
    </TextInputWrapper>
  )
})
