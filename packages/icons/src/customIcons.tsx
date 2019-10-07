import React, {SVGProps} from 'react'

export function IconColumn1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fillRule="evenodd">
        <path fillRule="nonzero" d="M2 35h44V13H2z" />
      </g>
    </svg>
  )
}

export function IconColumn2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fillRule="evenodd">
        <path fillRule="nonzero" d="M2 35h20V13H2v22zm24-22v22h20V13H26z" />
      </g>
    </svg>
  )
}

export function IconColumn2Alt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fillRule="evenodd">
        <path fillRule="nonzero" d="M2 35h31V13H2v22zm35-22v22h9V13h-9z" />
      </g>
    </svg>
  )
}

export function IconColumn4(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fillRule="evenodd">
        <path
          fillRule="nonzero"
          d="M26 36h8V14h-8v22zM2 36h8V14H2v22zm12 0h8V14h-8v22zm24-22v22h8V14h-8z"
        />
      </g>
    </svg>
  )
}

export function IconColumn6(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <g fillRule="evenodd">
        <path
          fillRule="nonzero"
          d="M18 38h12V26H18v12zM2 38h12V26H2v12zm32-12h12v12H34V26zm-16-4V10h12v12H18zM2 22V10h12v12H2zm32-12h12v12H34V10z"
        />
      </g>
    </svg>
  )
}
