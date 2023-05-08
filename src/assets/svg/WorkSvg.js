import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#016243"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.8V3H5.4A2.4 2.4 0 003 5.4v15.2A2.4 2.4 0 005.4 23h13.2a2.4 2.4 0 002.4-2.4V5.4A2.4 2.4 0 0018.6 3H17V1.8A1.8 1.8 0 0015.2 0H8.8A1.8 1.8 0 007 1.8zm8 .2H9v2h6V2zm-9 8a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
        fill="#016243"
      />
    </Svg>
  )
}

export default SvgComponent
