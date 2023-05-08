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
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Pagination} from '../component/pagination';
import Contacts from 'react-native-contacts';
import {API_POST_EMPLOYEE} from './Type';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const PAGE_SIZE = 8;

const Ui = props => {
  const {navigation} = props;
  const accessToken = useSelector(state => state.auth.accessToken);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [code, setCode] = useState('');
  const [search, setSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valueInput, setValueInput] = useState();
  const [meta, setMeta] = useState({
    total_record: 0,
    current_page: 0,
    next_page: 0,
    items_per_page: 0,
  });
  const onEndReached = () => {
    !dataEmployee.length < PAGE_SIZE && setIsLoading(true);
    if (meta.next_page > meta.current_page || dataEmployee.length < PAGE_SIZE) {
      fetch(API_POST_EMPLOYEE, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          key: search,
          page: meta.next_page,
          items_per_page: PAGE_SIZE,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.code == 200) {
            const data = json.result.data.app_data;
            const meta = json.result.data.page;
            setDataEmployee([...dataEmployee, ...data]);
            setMeta(meta);
            setIsLoading(false);
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    fetch(API_POST_EMPLOYEE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        key: search,
        page: currentPage,
        items_per_page: PAGE_SIZE,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.code == 200) {
          const dataApi = json.result.data || {};
          const data = dataApi.app_data;
          const metaApi = dataApi.page;
          setMeta(metaApi);
          setDataEmployee(data || {});
        } else {
          console.log('failed!!!');
        }
      })
      .catch(err => console.log(err));
  }, [search]);
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
  const openModal = () => {
    setModalVisible(true);
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
      <View style={styles.viewSearch}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={text => setSearch(text)}
            onFocus={() => setModalVisible(true)}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataEmployee}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={({distanceFromEnd}) => {
          onEndReached();
        }}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : undefined}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.viewContent]}>
          <TouchableOpacity
            onPress={() => {
              onChange(valueInput, 'name');
            }}
            style={styles.buttonContainer}>
            <Text style={styles.buttonTitle}>Tìm tên </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonContainer, {marginTop: 10}]}
            onPress={() => {
              onChange(valueInput, 'mobile_phone');
            }}>
            <Text style={styles.buttonTitle}>Tìm sđt </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  viewSearch: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
  },
  inputSearch: {
    height: 50,
    paddingHorizontal: 16,
    lineHeight: 16,
    flex: 1,
  },
  buttonContainer: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#ffb84d',
  },
  buttonTitle: {
    color: 'white',
    paddingHorizontal: 50,
    fontSize: 19,
  },
  viewContent: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 60,
    marginRight: 20,
    height: 100,
    width: 200,
    backgroundColor: '#e0e0eb',
  },
});
