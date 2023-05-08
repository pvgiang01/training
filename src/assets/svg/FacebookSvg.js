import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgFacebook(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30 15c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15z"
        fill="url(#paint0_linear_2611_190)"
      />
      <Path
        d="M12.6 19.5v10.2a.3.3 0 00.3.3h4.2a.3.3 0 00.3-.3V19.5a.3.3 0 01.3-.3h3a.3.3 0 00.3-.3v-3.6a.3.3 0 00-.3-.3h-3a.3.3 0 01-.3-.3V12c0-1.2 1.5-1.8 2.1-1.8h1.8a.3.3 0 00.3-.3V6.3a.3.3 0 00-.3-.3h-3.9c-2.88 0-4.8 3-4.8 4.8v3.9a.3.3 0 01-.3.3h-3a.3.3 0 00-.3.3v3.6a.3.3 0 00.3.3h3a.3.3 0 01.3.3z"
        fill="#016243"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2611_190"
          x1={15}
          y1={0}
          x2={15}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgFacebook
