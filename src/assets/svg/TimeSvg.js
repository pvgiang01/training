import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgTime(props) {
  return (
    <Svg
      fill="#016243"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M23 18h-3v-3a1 1 0 00-2 0v3h-3a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2zM11 7v4.586l-2.707 2.707a1 1 0 101.414 1.414l3-3A1 1 0 0013 12V7a1 1 0 00-2 0zm3.728 14.624a9.985 9.985 0 116.9-6.895 1 1 0 101.924.542 11.989 11.989 0 10-8.276 8.277 1 1 0 10-.544-1.924z" />
    </Svg>
  )
}

export default SvgTime
