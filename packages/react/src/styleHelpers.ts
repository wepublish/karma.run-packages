export interface MarginProperties {
  marginTop?: string | number
  marginRight?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
}

export function margin(margin?: string | number): MarginProperties
export function margin(vMargin?: string | number, hMargin?: string | number): MarginProperties
export function margin(
  marginTop?: string | number,
  hMargin?: string | number,
  marginBottom?: string | number
): MarginProperties
export function margin(
  marginTop?: string | number,
  marginRight?: string | number,
  marginBottom?: string | number,
  marginLeft?: string | number
): MarginProperties
export function margin(...args: (string | number | undefined)[]): MarginProperties {
  if (args.length === 1) {
    const [margin] = args
    return {marginTop: margin, marginRight: margin, marginBottom: margin, marginLeft: margin}
  }

  if (args.length === 2) {
    const [vMargin, hMargin] = args
    return {marginTop: vMargin, marginRight: hMargin, marginBottom: vMargin, marginLeft: hMargin}
  }

  if (args.length === 3) {
    const [marginTop, hMargin, marginBottom] = args
    return {marginTop, marginRight: hMargin, marginBottom, marginLeft: hMargin}
  }

  if (args.length === 4) {
    const [marginTop, marginRight, marginBottom, marginLeft] = args
    return {marginTop, marginRight, marginBottom, marginLeft}
  }

  throw new Error('Invalid number of arguments.')
}

export interface PaddingProperties {
  paddingTop?: string | number
  paddingRight?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
}

export function padding(padding?: string | number): PaddingProperties
export function padding(vPadding?: string | number, hPadding?: string | number): PaddingProperties
export function padding(
  paddingTop?: string | number,
  hPadding?: string | number,
  paddingBottom?: string | number
): PaddingProperties
export function padding(
  paddingTop?: string | number,
  paddingRight?: string | number,
  paddingBottom?: string | number,
  paddingLeft?: string | number
): PaddingProperties
export function padding(...args: (string | number | undefined)[]): PaddingProperties {
  if (args.length === 1) {
    const [padding] = args
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding
    }
  }

  if (args.length === 2) {
    const [vPadding, hPadding] = args
    return {
      paddingTop: vPadding,
      paddingRight: hPadding,
      paddingBottom: vPadding,
      paddingLeft: hPadding
    }
  }

  if (args.length === 3) {
    const [paddingTop, hPadding, paddingBottom] = args
    return {paddingTop, paddingRight: hPadding, paddingBottom, paddingLeft: hPadding}
  }

  if (args.length === 4) {
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = args
    return {paddingTop, paddingRight, paddingBottom, paddingLeft}
  }

  throw new Error('Invalid number of arguments.')
}
