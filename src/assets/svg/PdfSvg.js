import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgPdf(props) {
  return (
    <Svg
      width="40"
      height="25"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.5 6.5V6H2v.5h.5zm4 0V6H6v.5h.5zm0 4H6v.5h.5v-.5zm7-7h.5v-.207l-.146-.147-.354.354zm-3-3l.354-.354L10.707 0H10.5v.5zM2.5 7h1V6h-1v1zm.5 4V8.5H2V11h1zm0-2.5v-2H2v2h1zm.5-.5h-1v1h1V8zm.5-.5a.5.5 0 01-.5.5v1A1.5 1.5 0 005 7.5H4zM3.5 7a.5.5 0 01.5.5h1A1.5 1.5 0 003.5 6v1zM6 6.5v4h1v-4H6zm.5 4.5h1v-1h-1v1zM9 9.5v-2H8v2h1zM7.5 6h-1v1h1V6zM9 7.5A1.5 1.5 0 007.5 6v1a.5.5 0 01.5.5h1zM7.5 11A1.5 1.5 0 009 9.5H8a.5.5 0 01-.5.5v1zM10 6v5h1V6h-1zm.5 1H13V6h-2.5v1zm0 2H12V8h-1.5v1zM2 5V1.5H1V5h1zm11-1.5V5h1V3.5h-1zM2.5 1h8V0h-8v1zm7.646-.146l3 3 .708-.708-3-3-.708.708zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1zM1 12v1.5h1V12H1zm1.5 3h10v-1h-10v1zM14 13.5V12h-1v1.5h1zM12.5 15a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM1 13.5A1.5 1.5 0 002.5 15v-1a.5.5 0 01-.5-.5H1z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgPdf
