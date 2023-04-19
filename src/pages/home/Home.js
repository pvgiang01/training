import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/store';
import {Pagination} from '../../component/pagination';
import Contacts from 'react-native-contacts';
export const PAGE_SIZE = 8;
const Ui = props => {
  const {navigation} = props;
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [code, setCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState({
    total_record: 0,
    current_page: 0,
    next_page: 0,
    items_per_page: 0,
  });
  const onEndReached = () => {
    setIsLoading(true);
    if (meta.next_page > meta.current_page) {
      fetch('https://vanhuong-poc.izisolution.vn/api/v1/vh/employee/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          code: code,
          page: meta.next_page,
          items_per_page: PAGE_SIZE,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.code == 200) {
            let data = json.result.data.app_data;
            let meta = json.result.data.meta;
            setDataEmployee([...dataEmployee, ...data]);
            setMeta(meta);
            setIsLoading(false);
          }
        })
        .catch(err => console.log(err));
    }
  };
  useEffect(() => {
    fetch('https://vanhuong-poc.izisolution.vn/api/v1/vh/employee/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        code: code,
        page: currentPage,
        items_per_page: PAGE_SIZE,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.code == 200) {
          let data = json.result.data.app_data;
          let meta = json.result.data.meta;
          setDataEmployee(data);
          setMeta(meta);
        } else {
          console.log('failed!!!');
        }
      })
      .catch(err => console.log(err));
  }, [code]);
  const handlePhonePress = (phoneNumber, name) => {
    Alert.alert(
      phoneNumber,
      'Chọn tác vụ',
      [
        {
          text: 'Gọi',
          onPress: () => Linking.openURL(`tel:${phoneNumber}`),
        },
        {
          text: 'Lưu',
          onPress: () => {
            const newContact = {
              givenName: name,
              displayName: 'New Contact',
              phoneNumbers: [
                {
                  label: 'mobile',
                  number: phoneNumber,
                },
              ],
            };
            Contacts.addContact(newContact)
              .then(() => {
                ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
              })
              .catch(error => {
                ToastAndroid.show('Lưu không thành công', ToastAndroid.SHORT);
                console.error('Failed to add contact', error);
              });
          },
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderPagination = () => {
    return (
      <Pagination
        totalRecord={meta.total_record}
        current={currentPage}
        onChange={currentPage => {
          setCurrentPage(currentPage);
        }}
      />
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: item.id})}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          style={styles.imgFlat}
          resizeMode="contain"
          source={{uri: item.img_url}}
        />
        <View style={styles.textFlat}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            {item.name}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>{item.position}</Text>
          <Text style={{color: 'black', fontSize: 20}}>{item.code}</Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              backgroundColor: '#ffc266',
              width: 120,
              borderRadius: 10,
            }}
            onPress={() => handlePhonePress(item.mobile_phone, item.name)}>
            {item.mobile_phone}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={dataEmployee}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={({distanceFromEnd}) => {
          onEndReached();
        }}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : undefined}
      />
    </View>
  );
};

export default Ui;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textFlat: {
    marginLeft: 10,
    margin: 10,
  },
  line: {
    height: 2,
    width: 400,
    backgroundColor: 'orange',
    opacity: 1,
    alignSelf: 'center',
  },
  imgFlat: {
    height: 130,
    width: 100,
    margin: 5,
    borderRadius: 5,
    borderColor: '#e0e0eb',
    borderWidth: 5,
  },
});
