import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgChild(props) {
  return (
    <Svg
      fill="#016243"
      height="30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...props}
    >
      <Path d="M121.27 190.248c-5.165-2.831-11.649-.938-14.481 4.229l-.214.388c-2.831 5.166-.939 11.65 4.229 14.481a10.665 10.665 0 0014.481-4.229l.214-.388c2.831-5.166.937-11.65-4.229-14.481z" />
      <Path d="M462.628 224.163c-16.774-65.288-63.804-119.561-127.263-144.923-10.962-34.232-43.193-57.909-79.364-57.909-37.096 0-68.595 24.372-79.359 57.94-38.219 15.308-70.948 41.132-94.893 74.963-15.127 21.374-26.033 45.002-32.419 69.932C21.787 226.223 0 249.274 0 277.333c0 28.075 21.809 51.138 49.374 53.172 23.687 91.991 107.344 160.163 206.627 160.163 99.281 0 182.938-68.172 206.624-160.163C490.19 328.471 512 305.408 512 277.331c0-28.072-21.808-51.132-49.372-53.168zM21.335 277.331c0-14.719 9.993-27.148 23.549-30.864a215.103 215.103 0 00-1.9 19.217c-.006.09-.009.178-.014.268a207.154 207.154 0 00-.159 3.532c-.017.447-.026.894-.038 1.341-.026.846-.053 1.691-.069 2.538a228.338 228.338 0 00-.037 3.969 206.042 206.042 0 00.104 6.359c.034 1.175.08 2.35.134 3.524.022.498.042.997.067 1.496.078 1.466.172 2.93.279 4.394.051.688.111 1.372.167 2.058a226.706 226.706 0 00.461 4.894c.094.892.201 1.783.306 2.673.139 1.166.288 2.329.445 3.488.09.664.173 1.327.269 1.987-13.564-3.711-23.564-16.147-23.564-30.874zM256.001 42.666c21.127 0 40.45 10.85 51.728 27.833a67.684 67.684 0 00-.638-.003c-.138 0-.272.01-.41.011-.053.002-.107.001-.161.004-33.213.309-60.137 27.411-60.137 60.694 0 12.952 4.069 25.266 11.38 35.426a64.76 64.76 0 01-1.762.025c-34.183 0-61.993-27.81-61.993-61.993-.001-34.186 27.809-61.997 61.993-61.997zm191.93 239.72c-.006.26-.021.518-.029.778a198.187 198.187 0 01-.171 4.288c-.013.255-.033.51-.048.765a197.941 197.941 0 01-.283 4.281c-.022.288-.053.574-.077.862a196.701 196.701 0 01-.382 4.13c-.039.383-.089.764-.131 1.146-.14 1.26-.286 2.518-.45 3.775-.069.526-.147 1.049-.221 1.573-.15 1.087-.304 2.173-.475 3.256-.111.705-.231 1.405-.35 2.108-.147.877-.294 1.753-.454 2.627-.162.889-.335 1.773-.51 2.656-.13.662-.26 1.325-.398 1.986-18.179 87.091-95.545 152.716-187.953 152.716-92.476 0-169.888-65.718-187.994-152.904-.164-.79-.315-1.585-.468-2.379-.148-.758-.299-1.516-.437-2.277a195.897 195.897 0 01-.553-3.243c-.081-.497-.17-.993-.247-1.491-.212-1.37-.406-2.742-.59-4.117-.031-.233-.069-.465-.098-.698-.21-1.619-.402-3.243-.571-4.867l-.002-.023a193.298 193.298 0 01-1.04-19.999 189.396 189.396 0 01.105-6.005c.031-1.014.073-2.028.121-3.042.027-.59.053-1.181.086-1.77.051-.898.115-1.796.178-2.693.111-1.55.236-3.097.383-4.64.017-.177.031-.354.048-.53 6.556-66.39 47.673-125.306 107.761-154.328 0 .113-.008.224-.008.337a83.058 83.058 0 002.985 22.056c-19.146 10.195-35.959 23.779-50.052 40.48-3.8 4.503-3.229 11.233 1.274 15.031a10.62 10.62 0 006.874 2.514c3.034 0 6.048-1.288 8.157-3.788 11.905-14.108 26.026-25.67 42.06-34.478 14.452 24.797 41.318 41.512 72.03 41.512a83.112 83.112 0 0027.5-4.653 10.668 10.668 0 002.266-19.029c-11.302-7.301-18.05-19.675-18.05-33.102 0-21.271 16.957-38.644 38.063-39.341 70.854 18.957 123.549 76.248 138.148 146.074.241 1.155.476 2.312.695 3.472.114.606.219 1.216.33 1.824.17.949.337 1.9.493 2.852a190.943 190.943 0 01.741 4.93c.062.447.126.894.185 1.342.406 3.118.737 6.248.992 9.384.029.359.052.721.079 1.082a190.29 190.29 0 01.451 8.483c.015.445.031.89.043 1.334.038 1.564.062 3.128.062 4.69-.001 1.685-.024 3.37-.068 5.053zm19.17 25.819c.117-.806.223-1.616.331-2.425a218.8 218.8 0 00.7-5.8c.075-.706.144-1.414.21-2.123.09-.929.172-1.858.249-2.787.053-.644.11-1.286.157-1.932.11-1.481.204-2.962.283-4.446.027-.478.043-.957.066-1.436.054-1.193.1-2.385.135-3.579a224.2 224.2 0 00.103-6.346c0-1.407-.017-2.814-.044-4.221-.011-.511-.028-1.021-.042-1.532-.023-.883-.05-1.766-.083-2.65-.025-.628-.057-1.256-.085-1.883-.037-.76-.075-1.518-.121-2.276a208.914 208.914 0 00-.284-4.139c-.055-.709-.11-1.419-.173-2.126-.061-.684-.128-1.365-.195-2.048-.068-.703-.134-1.407-.209-2.11-.085-.794-.182-1.584-.277-2.377-.105-.881-.212-1.76-.328-2.638-.127-.958-.252-1.916-.391-2.871 13.566 3.71 23.564 16.144 23.564 30.869-.002 14.731-10 27.165-23.566 30.876z" />
      <Path d="M218.055 289.68c-4.99-18.62-21.936-31.625-41.213-31.625-19.274 0-36.222 13.005-41.213 31.625-1.525 5.691 1.852 11.54 7.542 13.065 5.692 1.523 11.54-1.852 13.065-7.542 2.496-9.311 10.969-15.814 20.605-15.814 9.637 0 18.11 6.503 20.605 15.814 1.277 4.765 5.588 7.908 10.297 7.908.913 0 1.843-.118 2.768-.366 5.693-1.525 9.069-7.374 7.544-13.065zM335.161 258.055c-19.277 0-36.225 13.006-41.214 31.626-1.524 5.691 1.853 11.54 7.544 13.064 5.689 1.526 11.539-1.853 13.063-7.543 2.495-9.31 10.968-15.813 20.606-15.813 9.637 0 18.11 6.503 20.605 15.814 1.277 4.765 5.586 7.908 10.297 7.908.913 0 1.843-.118 2.768-.366 5.691-1.525 9.067-7.375 7.542-13.065-4.99-18.619-21.936-31.625-41.211-31.625zM289.672 364.521c-5.689-1.524-11.54 1.851-13.065 7.543-2.496 9.311-10.969 15.814-20.605 15.814-9.638 0-18.111-6.503-20.605-15.814-1.525-5.691-7.374-9.068-13.065-7.543-5.691 1.525-9.067 7.374-7.542 13.065 4.99 18.622 21.936 31.626 41.213 31.626 19.275 0 36.223-13.005 41.213-31.626 1.523-5.69-1.854-11.54-7.544-13.065z" />
    </Svg>
  )
}

export default SvgChild