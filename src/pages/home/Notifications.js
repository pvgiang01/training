import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import {
  API_NOTIFICATIONS,
  API_SEEN_ALL_NOTIFICATIONS,
} from '../../repository/Type';
import {useAppSelector} from '../../redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
const Notifications = (props) => {
  const {navigation} = props;
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [dataNotifications, setDataNotifications] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [unseen, setUnseen] = useState();
  const [markAllNotifications,setMarkAllNotifications] = useState()
  const [isLoading,setIsLoading] = useState(true)
  const [state, setState] = useState(0);
  useEffect(() => {
    fetch(API_NOTIFICATIONS, {
      method: 'POST',
      headers: {
        Accept: 'applicaton/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    })
      .then(respone => respone.json())
      .then(json => {
        if (json.result?.status) {
          const data = json.result.data.data;
          const dataUnseen = json.result.data.unseen;
          setDataNotifications(data);
          setUnseen(dataUnseen);
          setState(state +1)
        } else {
          console.log('Failed!!!!');
        }
      })
      .catch(error => console.log('Error: ', error))
      .finally(() => setIsLoading(false))
  }, []);
  
  const handleMarkAll = () =>{
    fetch(API_SEEN_ALL_NOTIFICATIONS,{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: accessToken,
      })
    })
    .then((response) => response.json())
    .then((json) =>{
      if(json.result?.status){
        const data = json.result.data
        setDataNotifications(data)
      }
    })
    .catch((error) => console.log('Error: ',error))
    setModalVisible(false)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={item?.status === 'seen' ? styles.viewSeen : styles.viewUnseen}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailNotification', { message: item.message })}>
          <View style={{ flexDirection: 'row', padding: 10, bottom: 10 }}>
            <View style={styles.viewIcon}>
              <Ionicons name="notifications" size={30} color="white" />
            </View>
            <View style={{ top: 5, left: 5 }}>
              <Text style={{ color: 'black', fontFamily: 'Chakra-Petch', fontSize: 20 }}>
                {item.subject}
              </Text>
              <Text
                style={{
                  color: '#595959',
                  fontSize: 17,
                  maxWidth: '100%',
                  paddingRight: 70,
                }}>
                {item.message}
              </Text> 
              <Text
                style={{
                  color: '#595959',
                  fontSize: 13,
                  maxWidth: '100%', 
                }}>
                {item.create_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor: 'white', width: '100%' }} />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.textHeader}>{i18n.t('Notifications')}</Text>
        </View>
        <TouchableOpacity
          style={{marginLeft: 280, margin: 10}}
          onPress={() => setModalVisible(true)}>
          <Text style={{fontSize: 17, color: '#016243'}}>
            {i18n.t('ReadAll')} ({unseen})
          </Text>
        </TouchableOpacity>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
          data={dataNotifications}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
        )}

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 20, color: 'black'}}>
                {i18n.t('MarkAll')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
              onPress={()=>handleMarkAll()}
                style={styles.btnModal}>
                <Text style={styles.textStyle}>{i18n.t('Agree')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: 'gray', borderRadius: 5, width: 90}}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>{i18n.t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewUnseen: {
    backgroundColor: '#d9d9d9',
  },
  viewSeen: {
    backgroundColor: 'white',
  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#016243',
    height: 50,
  },
  textHeader: {
    fontSize: 20,
    color: 'white',
    fontFamily:'Chakra-Petch'
  },
  viewIcon: {
    height: 50,
    width: 50,
    backgroundColor: '#016243',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    height: 100,
    width: 300,
    elevation: 2,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontFamily:'Chakra-Petch',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModal:{
    backgroundColor: '#016243',
    borderRadius: 5,
    marginRight: 20,
    height: 35,
    width: 90,
  }
});
