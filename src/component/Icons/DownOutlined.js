import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
const DownOutlined = props => {
  const {size} = props;
  return (
    <>
      <Entypo
        name="chevron-thin-down"
        size={size ? size : 20}
        color="#3F3F3F"
      />
    </>
  );
};

export default DownOutlined;
