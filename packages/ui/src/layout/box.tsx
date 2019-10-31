import React, {ReactNode, forwardRef, Ref} from 'react'

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
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {margin, padding} from '@karma.run/react'

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

  readonly element?: keyof JSX.IntrinsicElements
  readonly children?: ReactNode | ((props: {className: string}, ref: Ref<any>) => ReactNode)
}

type BoxStyleProps = Omit<Omit<BaseBoxProps, 'element'>, 'children'>

const BoxBaseStyle = cssRuleWithTheme<BoxStyleProps>(
  ({
    flex,
    inlineFlex,
    block,
    inline,
    margin: marginValue,
    padding: paddingValue,
    theme,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...props
  }) => {
    marginValue =
      typeof marginValue === 'string' ? marginValue : marginValue && pxToRem(marginValue)

    marginTop = typeof marginTop === 'string' ? marginTop : marginTop && pxToRem(marginTop)

    marginBottom =
      typeof marginBottom === 'string' ? marginBottom : marginBottom && pxToRem(marginBottom)

    marginLeft = typeof marginLeft === 'string' ? marginLeft : marginLeft && pxToRem(marginLeft)

    marginRight =
      typeof marginRight === 'string' ? marginRight : marginRight && pxToRem(marginRight)

    paddingValue =
      typeof paddingValue === 'string' ? paddingValue : paddingValue && pxToRem(paddingValue)

    paddingTop = typeof paddingTop === 'string' ? paddingTop : paddingTop && pxToRem(paddingTop)

    paddingBottom =
      typeof paddingBottom === 'string' ? paddingBottom : paddingBottom && pxToRem(paddingBottom)

    paddingLeft =
      typeof paddingLeft === 'string' ? paddingLeft : paddingLeft && pxToRem(paddingLeft)

    paddingRight =
      typeof paddingRight === 'string' ? paddingRight : paddingRight && pxToRem(paddingRight)

    return {
      _className: process.env.NODE_ENV !== 'production' ? 'Box' : undefined,

      display: flex
        ? 'flex'
        : inlineFlex
        ? 'inline-flex'
        : block
        ? 'block'
        : inline
        ? 'inline'
        : undefined,

      ...margin(
        marginTop || marginValue,
        marginRight || marginValue,
        marginBottom || marginValue,
        marginLeft || marginValue
      ),

      ...padding(
        paddingTop || paddingValue,
        paddingRight || paddingValue,
        paddingBottom || paddingValue,
        paddingLeft || paddingValue
      ),

      ...props
    }
  }
)

export const Box = forwardRef<any, BaseBoxProps>(
  ({element = 'div', children, ...props}, ref: any) => {
    const style = useThemeStyle(props)
    const className = style(BoxBaseStyle)

    const Element = element as any
    const anyChildren = children as any

    return typeof anyChildren === 'function' ? (
      anyChildren({className}, ref)
    ) : (
      <Element className={className} ref={ref}>
        {children}
      </Element>
    )
  }
)

Box.displayName = 'Box'
