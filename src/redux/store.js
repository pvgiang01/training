import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';//lưu trữ tthai của store
import rootReducer from './reducer';
const persistConfig = {
  //tên lưu trữ
  key: 'root',
  //loại lưu trữ
  storage: AsyncStorage,
  ///ds slice dc lưu trữ
  whitelist: ['auth'],
};
//tạo reducer để lưu trữ tthai store
//root tạo ra reducer đã dc cấu hình
const persistedReducer = persistReducer(persistConfig, rootReducer);
//configure tạo ra redux store
const store = configureStore({
  //reducer đc cấu hình bởi persistedReducer
  reducer: persistedReducer,
  //midd cấu hình bằng cách gọi getDefault..
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      //cài đặt serial.. vô hiệu ktra dtg dc tuần tự hóa hay k
      serializableCheck: false,
    }),
});

//sử dụng trong các component
export const useAppSelector = useSelector;
//lưu trữ tthai của store
export default store;
//persistor khôi phục tthai khi ứng dụng khởi động lại
export const persistor = persistStore(store);
