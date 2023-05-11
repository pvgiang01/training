import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/store';
import {API_DETAIL_EMPLOYEE} from '../../repository/Type';
import i18n from '../../i18n/i18n';
const DetailScreen = ({route}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  let employee_id = route.params.id;
  const [dataEmployee, setDataEmployee] = useState([]);

  useEffect(() => {
    async function getDetailEmployee(){
     await fetch(API_DETAIL_EMPLOYEE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: access_token,
        employee_id: employee_id,
      }),
    })
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
    };
    getDetailEmployee();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#f2f2f2', margin: 10, borderRadius: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.imgFlat}
            resizeMode="contain"
            source={{uri: dataEmployee?.img_url?.value}}
          />
          <View style={styles.viewFlat}>
            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 20}}>
              {dataEmployee?.name?.value || ''}
            </Text>
              <Text style={{color: '#404040', fontSize: 15,marginTop:20}}>
                {dataEmployee?.code?.value || ''}
              </Text>
              <Text style={{color: '#404040', fontSize: 15}}>
                {dataEmployee?.department?.value?.name || ''}
              </Text>
              <Text style={{color: '#404040', fontSize: 15}}>
                {dataEmployee?.position?.value || ''}
              </Text>
              <Text
                style={{
                  color: '#404040',
                  fontSize: 15,
                  flexWrap:'wrap',
                  textAlign:'justify',
                  maxWidth: "100%"
                }}>
                {dataEmployee?.company?.value?.name || ''}
              </Text>
          </View>
         
        </View>
        <View style={styles.line}></View>
        <View style={{marginTop:30,marginLeft:15}}>
          <View style={{flexDirection: 'row', bottom: 15}}>
            <Text style={{color: '#404040', fontSize: 15, fontWeight: 'bold'}}>
              {i18n.t('MobilePhone')}
            </Text>
            <Text style={{marginLeft: 35, color: '#262626', fontSize: 15}}>
              {dataEmployee?.mobile_phone?.value || ''}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textFlat}>Email:</Text>
            <Text style={{marginLeft: 90, color: '#262626', fontSize: 15}}>
              {dataEmployee?.work_email?.value || ''}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textFlat, {marginTop: 10}]}>{i18n.t('Birthday')}</Text>
            <Text
              style={{
                marginLeft: 60,
                marginTop: 10,
                color: '#262626',
                fontSize: 15,
                marginBottom:10
              }}>
              {dataEmployee?.birthday?.value || ''}
            </Text>
          </View>
        </View>
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
    marginLeft: 10,
    marginTop: 40,
    flex: 1,
  },
  imgFlat: {
    height: 180,
    width: 125,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'white',
  },
  textFlat: {
    color: '#404040',
    fontSize: 15,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    width: 370,
    backgroundColor: 'black',
    opacity: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
});
