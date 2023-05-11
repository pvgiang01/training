import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
const CreateProject = ({navigation}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [input, setInput] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Nhân sự:</Text>
          <Text style={styles.textItem}>VH000784-Bùi Tiến Dũng</Text>
        </View>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Phòng ban:</Text>
          <Text style={styles.textItem}>Ban Tư vấn Giám sát</Text>
        </View>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Từ ngày:</Text>
          <Text style={styles.textItem}>09/05/2001</Text>
          <FontAwesome
            name="calendar"
            color="orange"
            size={20}
            style={{top: 5, marginLeft: 165}}
          />
        </View>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Đến ngày:</Text>
          <Text style={styles.textItem}>09/05/2001</Text>
          <FontAwesome
            name="calendar"
            color="orange"
            size={20}
            style={{top: 5, marginLeft: 150}}
          />
        </View>
        <View style={styles.line} />
        <View style={{margin: 10}}>
          <Text style={styles.text}>Lý do:</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setInput(text)}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{fontSize: 17, color: 'black', fontFamily: 'Chakra-Petch'}}>
            Hãy thêm lịch trình chi tiết
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.btnAdd}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <TouchableOpacity style={styles.btnSave}>
          <Text style={{color: 'white', fontSize: 20}}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btSent}>
          <Text style={{color: 'white', fontSize: 20}}>Gửi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCance}>
          <Text style={{color: 'white', fontSize: 20}}>Đóng</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Chi tiết lịch trình</Text>
            <View style={{margin: 10, flexDirection: 'row'}}>
              <Text style={styles.text}>Ngày:</Text>
              <Text style={styles.textItem}>09/05/2001</Text>
              <FontAwesome
                name="calendar"
                color="orange"
                size={20}
                style={{top: 5, marginLeft: 165}}
              />
            </View>
            <View style={styles.line} />
            <View style={{margin: 10, flexDirection: 'row'}}>
              <Text style={styles.text}>Hình thức:</Text>
            </View>
            <View style={styles.line} />

            <View style={{margin: 10, flexDirection: 'row'}}>
              <Text style={styles.text}>Địa điểm:</Text>
            </View>
            <View style={styles.line} />
            <View style={{margin: 10, flexDirection: 'row'}}>
              <Text style={styles.text}>Đăng ký ăn:</Text>
              <CheckBox
                style={{top: 5, marginLeft: 190}}
                onValueChange={newValue => setIsSelected(newValue)}
                disabled={false}
                value={isSelected}
                tintColor={{true: 'blue', false: 'white'}}
              />
            </View>
            <View style={styles.line} />
            <View style={{flexDirection: 'row', marginLeft: 50, marginTop: 10}}>
              <TouchableOpacity style={[styles.btnSave, {width: 150}]}>
                <Text style={{color: 'white', fontSize: 20}}>Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.btnCance, {width: 150}]}>
                <Text style={{color: 'white', fontSize: 20}}>hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 380,
    marginLeft: 10,
    bottom: 5,
  },
  text: {
    marginRight: 30,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  textItem: {
    marginTop: 5,
    fontSize: 17,
    color: 'black',
    fontFamily: 'ChakraPetch-Light',
  },
  textLeave: {
    fontSize: 17,
    fontFamily: 'Chakra-Petch',
    margin: 10,
    marginLeft: 90,
    color: 'black',
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: null,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 100,
    fontSize: 17,
    textAlignVertical: 'top',
  },
  btnAdd: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginLeft: 360,
    borderRadius: 30,
    backgroundColor: '#016243',
  },
  btnSave: {
    backgroundColor: '#016243',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btSent: {
    backgroundColor: '#2eb8b8',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCance: {
    backgroundColor: '#595959',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    width: '100%',
    height: 400,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
});
