import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions
} from 'react-native';
import {API_GET_TYPE_LEAVE} from '../repository/Type';

const SelectList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [typeLeave, setTypeLeave] = useState();
  useEffect(() => {
    function getTypeLeave() {
      fetch(API_GET_TYPE_LEAVE, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: access_token,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.status) {
            const data = json.result.data.app_data;
            setTypeLeave(data);
          }
        })
        .catch(error => console.log('Error: ', error));
    }
    getTypeLeave();
  }, []);
  const handleSelectTypeLeave = value => {
    setSelectedTypeLeave(value);
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <FlatList
            data={typeLeave}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSelectTypeLeave(item)}>
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default SelectList;
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#3F3F3F',
  },
});
