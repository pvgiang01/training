import * as React from 'react';
import {View, Text} from 'react-native'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';
import RootNav from './src/context/root-navigation';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNav />
      </PersistGate>
    </Provider>
  );
};
export default App;
