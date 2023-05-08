import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgWebsite(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M32 17a14.954 14.954 0 01-4.417 10.63A14.953 14.953 0 0117 32C8.716 32 2 25.285 2 17A14.949 14.949 0 016.125 6.669 14.957 14.957 0 0117 2a14.952 14.952 0 0110.583 4.37M32 17a14.954 14.954 0 00-4.417-10.63M32 17c-2.189 0-8.226-.825-13.63 1.547-5.87 2.578-10.12 6.576-11.973 9.063M32 17c0 1.847-.334 3.616-.945 5.25M27.583 6.37A15.027 15.027 0 0023 3.248m-11.625-.157c2.348 2.166 7.47 7.683 9.375 13.159 1.905 5.477 2.61 12.21 3.045 14.126M2.115 15.125c2.834.171 10.335.325 15.135-1.725 4.8-2.05 8.93-5.82 10.347-7.016M3.125 22.71a15.057 15.057 0 006.75 7.493"
        stroke="#fff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgWebsite
