import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
function SvgBackground(props) {
    return (
      <Svg
        width={420}
        height={690}
        viewBox="0 0 420 690"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
      >
        <Path fill="url(#pattern0)" d="M0 0H450V690H0z" />
        <Defs>
          <Pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <Use
              xlinkHref="#image0_2607_218"
              transform="matrix(.00192 0 0 .00108 0 0)"
            />
          </Pattern>
          <Image
            id="image0_2607_218"
            width={522}
            height={928}
          />
        </Defs>
      </Svg>
    )
  }
export default SvgBackground