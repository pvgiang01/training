import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"

function SvgEdit(props) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <Path
          d="M426.667 373.333V416H0v-42.667h426.667zM186.019 91.314l96 95.999-143.352 143.354h-96v-96L186.019 91.314zM277.333 0l96 96-68.686 68.686-96-96L277.333 0z"
          id="a" fill='white'
        />
      </Defs>
      <G
        transform="translate(42.667 53.333)"
        stroke="none"
        strokeWidth={1}
        fill="white"
        fillRule="evenodd"
      >
        <Mask fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Use fill="#000" xlinkHref="#a" />
      </G>
    </Svg>
  )
}

export default SvgEdit
