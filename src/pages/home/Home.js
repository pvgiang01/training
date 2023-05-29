import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Pressable,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useAppSelector} from '../../redux/store';
import {API_POST_EMPLOYEE} from '../../repository/Type';
import Filter from '../../component/Filter';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const PAGE_SIZE = 8;
import i18n from '../../i18n/i18n';
const Ui = props => {
  const phoneNumber = useRef(0);
  const {navigation} = props;
  const accessToken = useAppSelector(state => state.auth.access_token);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleFilter, setVisbleFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [handleData,setHandleData] = useState(false);
  const [meta, setMeta] = useState({
    total_record: 0,
    current_page: 0,
    next_page: 0,
    items_per_page: 0,
  });

  const onEndReached = () => {
    !dataEmployee.length < PAGE_SIZE && setIsLoading(false);
    if (meta.next_page > meta.current_page) {
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
            let data = json.result.data.app_data;
            let meta = json.result.data.page;
            setDataEmployee([...dataEmployee, ...data]);
            setMeta(meta);
            setIsLoading(false);
          }
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    function getEmployee() {
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
            let data = json.result.data.app_data;
            let meta = json.result.data.page;
            setDataEmployee(data);
            setMeta(meta);
          } else {
            console.log('failed!!!');
          }
        })
        .catch(err => console.log(err));
    }
    getEmployee();
  }, [search]);


  const handleCallPhone = () => {
    Linking.openURL(`tel:${phoneNumber.current}`);
    setModalVisible(false);
  };
  const handleSavePhone = name => {
    const newContact = {
      givenName: name,
      displayName: 'New Contact',
      phoneNumbers: [
        {
          label: 'mobile',
          number: phoneNumber.current,
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
    setModalVisible(false);
  };

  const openModal = (mobile_phone, name) => {
    phoneNumber.current = mobile_phone;
    name.current = name;
    setModalVisible(true);
  };
  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail',{id:item.id})}>
          <View style={styles.viewFlat}>
            <Image
              style={styles.imgFlat}
              resizeMode="contain"
              source={{uri: item.img_url}}
            />
            <View style={{marginLeft: 10, margin: 10}}>
              <Text style={styles.textFlat}>{item.name}</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                {item.department_id.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="qrcode"
                  color="red"
                  size={20}
                  style={{marginTop: 4}}
                />
                <Text style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                  {item.code}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name="mobile-phone"
                  color="red"
                  size={20}
                  style={{marginTop: 5}}
                />
                <Text
                  style={{color: 'black', fontSize: 17, marginLeft: 20}}
                  onPress={() => openModal(item.mobile_phone, item.name)}>
                  {item.mobile_phone}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  name="email"
                  color="red"
                  size={20}
                  style={{marginTop: 4}}
                />
                <Text style={{color: 'black', fontSize: 17, marginLeft: 10}}>
                  {item.work_email}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#016243',
            position: 'relative',
            alignItems: 'center',
          }}>
          <Pressable
            style={styles.press}
            onPress={() => {
              setVisbleFilter(true);
            }}>
            <TextInput
              editable={false}
              pointerEvents="none"
              defaultValue={search}
              style={styles.search}
              placeholder={i18n.t('Search')}
            />
          </Pressable>
          <TouchableOpacity style={{position:'absolute',bottom:65}} onPress={() =>setSearch()}>
          <Feather 
            name="refresh-ccw"
            color="red"
            size={20}
            style={{top: 20, position: 'absolute', marginLeft: 370}}
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
      </View>
      <Filter
        visible={visibleFilter}
        onRequestClose={() => {
          setVisbleFilter(false);
        }}
        onBackdropPress={() => {
          setVisbleFilter(false);
        }}
        value={search}
        onChange={(value, type) => {
          setSearch(value);
          setVisbleFilter(false);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                marginTop: 30,
                margin: 10,
              }}>
              <MaterialCommunityIcons name="phone" color="green" size={30} />
              <TouchableOpacity onPress={handleCallPhone}>
                <Text style={styles.textStyle}>Gọi</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 80,
              margin: 10,
            }}>
            <MaterialCommunityIcons
              name="account-box"
              color="green"
              size={30}
            />
            <Pressable onPress={() => handleSavePhone()}>
              <Text style={styles.textStyle}>Lưu vào danh bạ</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Ui;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE0E2',
  },
  textFlat: {
    color: '#016243',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Chakra-Petch',
  },
  line: {
    marginTop: 5,
  },
  imgFlat: {
    height: 130,
    width: 100,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  search: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    height: 45,
    paddingLeft: 10,
    padding: 10,
    width: '95%',
    fontFamily: 'Chakra-Petch',
  },
  press: {
    justifyContent: 'center',
    backgroundColor: '#016243',
    width: '100%',
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    height: 150,
    width: '100%',
    flexDirection: 'row',
    bottom: 49,
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewFlat: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
