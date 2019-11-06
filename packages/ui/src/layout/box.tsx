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
  MaxHeightProperty,
  OverflowProperty
} from 'csstype'

import {remify} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {margin, padding} from '@karma.run/react'

export interface BaseBoxProps {
  readonly flex?: boolean
  readonly inlineFlex?: boolean
  readonly inline?: boolean
  readonly block?: boolean
  readonly overflow?: OverflowProperty

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

  readonly width?: WidthProperty<string | number>
  readonly minWidth?: MinWidthProperty<string | number>
  readonly maxWidth?: MaxWidthProperty<string | number>

  readonly height?: HeightProperty<string | number>
  readonly minHeight?: MinHeightProperty<string | number>
  readonly maxHeight?: MaxHeightProperty<string | number>

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

    width,
    minWidth,
    maxWidth,

    height,
    minHeight,
    maxHeight,

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
    marginValue = remify(marginValue)
    paddingValue = remify(paddingValue)

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

      width: remify(width),
      minWidth: remify(minWidth),
      maxWidth: remify(maxWidth),

      height: remify(height),
      minHeight: remify(minHeight),
      maxHeight: remify(maxHeight),

      ...margin(
        remify(marginTop) || marginValue,
        remify(marginRight) || marginValue,
        remify(marginBottom) || marginValue,
        remify(marginLeft) || marginValue
      ),

      ...padding(
        remify(paddingTop) || paddingValue,
        remify(paddingRight) || paddingValue,
        remify(paddingBottom) || paddingValue,
        remify(paddingLeft) || paddingValue
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
