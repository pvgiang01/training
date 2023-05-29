import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgSend(props) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 12L4 4l2 8m14 0L4 20l2-8m14 0H6"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgSend
