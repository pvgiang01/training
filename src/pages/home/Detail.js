import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
const DetailScreen = ({route, navigation}) => {
  const accessToken = useAppSelector(state => state.auth.accessToken);
  let employee_id = route.params.id;
  const [dataEmployee, setDataEmployee] = useState([]);

  useEffect(() => {
    fetch(
      'https://vanhuong-poc.izisolution.vn/api/v1/vh/employee/information',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          employee_id: employee_id,
        }),
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json.result?.code == 200) {
          const data = json.result.data.app_data;
          setDataEmployee(data);
        } else {
          console.log('failed!!!');
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 130, width: 100, margin: 5, borderRadius: 5,borderWidth:5,borderColor:'#e0e0eb'}}
          resizeMode="contain"
          source={{uri: dataEmployee?.img_url?.value}}
        />
        <View style={styles.textFlat}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            {dataEmployee?.name?.value || ""}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {dataEmployee?.position?.value || ""}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {dataEmployee?.code?.value || ""}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {dataEmployee?.mobile_phone?.value || ""}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {dataEmployee?.work_email?.value || ""}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.textFlat}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
          Công ty: {dataEmployee?.company?.value?.name || ""}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Vị trí: {dataEmployee?.department?.value?.name || ""}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Chức vụ: {dataEmployee?.job?.value?.name || ""}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Địa chỉ: {dataEmployee?.current_address || ""}
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.textFlat}>
        <Text style={{color: 'black', fontSize: 20}}>
          Trình độ: {dataEmployee?.training?.value[0]?.degree_type_id?.name || ""}
        </Text>
        <Text style={{color: 'black', fontSize: 20}}>
          Type Training: {dataEmployee?.training?.value[0]?.type_training || ""}
        </Text>
      </View>
    </View>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  viewFlat: {
    flexDirection: 'row',
    height: 130,
    backgroundColor: 'white',
  },
  imgFlat: {
    height: 110,
    width: 100,
    margin: 5,
    borderRadius: 5,
  },
  textFlat: {
    marginLeft: 10,
  },
  line: {
    height: 1,
    width: 400,
    backgroundColor: 'orange',
    opacity: 1,
    alignSelf: 'center',
    margin:10
  },
});
