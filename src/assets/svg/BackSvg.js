import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgBack(props) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11 10l4 4m-4 0l4-4M2.772 13.518l4.666 4A2 2 0 008.74 18H18a2 2 0 002-2V8a2 2 0 00-2-2H8.74a2 2 0 00-1.302.481l-4.666 4a2 2 0 000 3.037z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgBack
