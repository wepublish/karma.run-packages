import React, {ElementType, ReactNode} from 'react'
import {cssRule} from '@karma.run/react'
import {toArray} from '@karma.run/utility'

import {
  FlexDirectionProperty,
  JustifyContentProperty,
  JustifySelfProperty,
  JustifyItemsProperty,
  AlignItemsProperty,
  AlignContentProperty,
  AlignSelfProperty,
  FlexBasisProperty,
  GlobalsNumber,
  FlexWrapProperty,
  MinWidthProperty,
  MaxWidthProperty,
  WidthProperty,
  HeightProperty,
  MinHeightProperty,
  MaxHeightProperty
} from 'csstype'

import {pxToRem} from '../style/helpers'
import {CSSRuleWithTheme, useThemeStyle} from '../style/themeContext'

export interface BaseBoxProps {
  readonly flex?: boolean
  readonly inlineFlex?: boolean
  readonly inline?: boolean
  readonly block?: boolean

  readonly flexDirection?: FlexDirectionProperty
  readonly justifyContent?: JustifyContentProperty
  readonly justifyItems?: JustifyItemsProperty
  readonly justifySelf?: JustifySelfProperty
  readonly alignContent?: AlignContentProperty
  readonly alignItems?: AlignItemsProperty
  readonly alignSelf?: AlignSelfProperty
  readonly flexBasis?: FlexBasisProperty<string>
  readonly flexGrow?: GlobalsNumber
  readonly flexShrink?: GlobalsNumber
  readonly flexWrap?: FlexWrapProperty

  readonly width?: WidthProperty<string>
  readonly minWidth?: MinWidthProperty<string>
  readonly maxWidth?: MaxWidthProperty<string>

  readonly height?: HeightProperty<string>
  readonly minHeight?: MinHeightProperty<string>
  readonly maxHeight?: MaxHeightProperty<string>

  readonly padding?: number | string
  readonly paddingTop?: number | string
  readonly paddingBottom?: number | string
  readonly paddingLeft?: number | string
  readonly paddingRight?: number | string

  readonly margin?: number | string
  readonly marginTop?: number | string
  readonly marginBottom?: number | string
  readonly marginLeft?: number | string
  readonly marginRight?: number | string

  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

export interface BoxProps<P = undefined> extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BoxPropsWithoutStyleProps extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BoxPropsWithStyleProps<P = undefined> extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

type BoxStyleProps = Omit<Omit<BaseBoxProps, 'element'>, 'children'>

const BoxBaseStyle = cssRule<BoxStyleProps>(
  ({flex, inlineFlex, block, inline, margin, padding, ...props}) => ({
    display: flex
      ? 'flex'
      : inlineFlex
      ? 'inline-flex'
      : block
      ? 'block'
      : inline
      ? 'inline'
      : undefined,
    margin: typeof margin === 'number' ? pxToRem(margin) : margin,
    padding: typeof padding === 'number' ? pxToRem(padding) : padding,
    ...props
  })
)

const BoxMarginStyle = cssRule<BoxStyleProps>(
  ({marginTop, marginBottom, marginLeft, marginRight}) => ({
    marginTop: typeof marginTop === 'number' ? pxToRem(marginTop) : marginTop,
    marginBottom: typeof marginBottom === 'number' ? pxToRem(marginBottom) : marginBottom,
    marginLeft: typeof marginLeft === 'number' ? pxToRem(marginLeft) : marginLeft,
    marginRight: typeof marginRight === 'number' ? pxToRem(marginRight) : marginRight
  })
)

const BoxPaddingStyle = cssRule<BoxStyleProps>(
  ({paddingTop, paddingBottom, paddingLeft, paddingRight}) => ({
    paddingTop: typeof paddingTop === 'number' ? pxToRem(paddingTop) : paddingTop,
    paddingBottom: typeof paddingBottom === 'number' ? pxToRem(paddingBottom) : paddingBottom,
    paddingLeft: typeof paddingLeft === 'number' ? pxToRem(paddingLeft) : paddingLeft,
    paddingRight: typeof paddingRight === 'number' ? pxToRem(paddingRight) : paddingRight
  })
)

export function Box(props: BoxPropsWithoutStyleProps): JSX.Element
export function Box<P = undefined>(props: BoxPropsWithStyleProps<P>): JSX.Element
export function Box<P = undefined>({
  element = 'div',
  style,
  styleProps,
  children,
  ...props
}: BoxProps<P>): JSX.Element {
  const Element = element
  const {css} = useThemeStyle(Object.assign({}, props, styleProps))

  return (
    <Element className={css(BoxBaseStyle, BoxMarginStyle, BoxPaddingStyle, ...toArray(style))}>
      {children}
    </Element>
  )
}
