import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgFile(props) {
  return (
    <Svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="#016243"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.157 3h-8.52C5.732 3 5 3.733 5 4.636v14.728C5 20.267 5.733 21 6.636 21h11.455c.904 0 1.636-.733 1.636-1.636V7.57L15.157 3zm-.339 4.91V4.974l2.934 2.934h-2.934zM14.295 11l.705.71-4 4-2-1.995.71-.705L11 14.295 14.295 11z"
        fill="#016243"
      />
    </Svg>
  )
}

export default SvgFile
