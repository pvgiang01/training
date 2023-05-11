import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
const TabView = () =>{

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }} />
);
}
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
export default TabView