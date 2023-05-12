import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../redux/store';
import {
  API_GET_REMAIN_LEAVE,
  API_GET_TYPE_LEAVE,
  API_CREATE_LEAVE,
} from '../../repository/Type';
import {Calendar} from 'react-native-calendars';
import localConfigCalendar from '../../component/LocalConfig';
import moment from 'moment';
import {eachDayOfInterval, format} from 'date-fns';
export const CreateLeave = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  const [isSelected, setIsSelected] = useState(false);
  const [note, setNote] = useState();
  const [dataLeave, setDataLeave] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [fromDate, setFormDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [typeLeave, setTypeLeave] = useState('');
  const [selectedTypeLeave, setSelectedTypeLeave] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [dropdownValue, setDropdownValue] = useState([]);

  const currentDate = moment().format('DD/MM/YYYY');
  localConfigCalendar;

  useEffect(() => {
    function getRemainLeave() {
      fetch(API_GET_REMAIN_LEAVE, {
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
            const data = json.result.data;
            setDataLeave(data);
          }
        })
        .catch(error => console.log('Error: ', error));
    }
    getRemainLeave();
  }, []);

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
            const newOptions = data.map(item => ({
              label: item.name,
              value: item.id,
            }));
            setTypeLeave(newOptions);
          }
        })
        .catch(error => console.log('Error: ', error));
    }
    getTypeLeave();
  }, []);
  const handleCreateLeave = () => {
    fetch(API_CREATE_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: access_token,
        empolyee_id: empolyee_id,
        type_id: selectedTypeLeave,
        date_from: fromDate,
        date_to: toDate,
        used_time_off_fund: isSelected,
        note: note,
        lines: {
          date: date,
          type: type,
        },
      }),
    });
  };
  const handlePressFormDate = () => {
    setShowCalendar(true);
    setFormDate('');
  };
  const handlePressToDate = () => {
    setShowCalendar2(true);
    setToDate('');
  };
  const handleFromDayPress = day => {
    setShowCalendar(false);
    setFormDate(day.dateString);
  };
  const handleToDayPress = day => {
    setShowCalendar2(false);
    setToDate(day.dateString);
  };
  const getDaysInRange = day => {
    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      const days = eachDayOfInterval({start: fromDateObj, end: toDateObj});
      setDropdownValue([]);
      return days;
    } else if (fromDate) {
      return [new Date(fromDate)];
    } else {
      return [];
    }
  };
  const handleSelectTypeLeave = value => {
    setSelectedTypeLeave(value);
    setModalVisible(false);
  };
  const handleDropdownChange = value => {
    setDropdownValue(value);
    setModalType(false);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Nhân sự:</Text>
          <Text style={styles.textItem}></Text>
        </View>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Phòng ban:</Text>
          <Text style={styles.textItem}></Text>
        </View>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => handlePressFormDate()}
          style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Từ ngày:</Text>
          <Text style={styles.textItem}>{fromDate || currentDate}</Text>
          <FontAwesome
            name="calendar"
            color="orange"
            size={20}
            style={{top: 5, marginLeft: 180}}
          />
          <Modal visible={showCalendar} transparent animationType="fade">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {showCalendar && (
                  <Calendar
                    onDayPress={handleFromDayPress}
                    hideExtraDays
                    theme={{
                      textDayFontFamily: 'Chakra-Petch',
                      textMonthFontFamily: 'ChakraPetch-Light',
                      textDayFontSize: 20,
                      textMonthFontSize: 20,
                      textDayHeaderFontSize: 15,
                    }}
                    minDate={null}
                    current={Date()}
                    markingType="period"
                    markedDates={{[fromDate]: {selected: true}}}
                  />
                )}
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => handlePressToDate()}
          style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Đến ngày:</Text>
          <Text style={styles.textItem}>{toDate || currentDate}</Text>
          <FontAwesome
            name="calendar"
            color="orange"
            size={20}
            style={{top: 5, marginLeft: 170}}
          />
          <Modal visible={showCalendar2} transparent animationType="fade">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {showCalendar2 && (
                  <Calendar
                    onDayPress={handleToDayPress}
                    hideExtraDays
                    minDate={null}
                    theme={{
                      textDayFontFamily: 'Chakra-Petch',
                      textMonthFontFamily: 'ChakraPetch-Light',
                      textDayFontSize: 20,
                      textMonthFontSize: 20,
                      textDayHeaderFontSize: 15,
                    }}
                    current={Date()}
                    markingType="period"
                    markedDates={{[toDate]: {selected: true}}}
                  />
                )}
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Số ngày nghỉ còn lại:</Text>
          <Text style={styles.textItem}>{dataLeave?.remain_leave}</Text>
        </View>
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Sử dụng quỹ nghỉ bù:</Text>
          <CheckBox
            style={{top: 5, marginLeft: 170}}
            onValueChange={newValue => setIsSelected(newValue)}
            disabled={false}
            value={isSelected}
            tintColor={{true: 'blue', false: 'white'}}
          />
        </View>
        <View style={styles.line} />
        {isSelected && (
          <View style={{margin: 10, flexDirection: 'row'}}>
            <Text style={styles.text}>Số giờ nghỉ bù còn lại:</Text>
            <Text style={styles.textItem}>{dataLeave?.remaining_hours}</Text>
          </View>
        )}
        <View style={styles.line} />
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Text style={styles.text}>Loại nghỉ phép:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}>
            {selectedTypeLeave.label ? (
              <Text style={styles.textItem}>{selectedTypeLeave.label}</Text>
            ) : (
              <Text style={styles.placeholder}>Chọn loại nghỉ phép</Text>
            )}
            <FontAwesome
              name="caret-down"
              style={styles.icon}
              size={20}
              color="#3F3F3F"
            />
          </TouchableOpacity>
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
                      onPress={() => handleSelectTypeLeave(item.id)}>
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        <View
          style={{
            height: 3,
            width: 390,
            marginLeft: 10,
            backgroundColor: '#016243',
          }}
        />
        <View
          style={{
            backgroundColor: '#d9d9d9',
            marginLeft: 10,
            flexDirection: 'row',
            width: 390,
            height: 50,
          }}>
          <Text style={styles.textLeave}>Ngày</Text>
          <Text style={styles.textLeave}>Buổi nghỉ</Text>
        </View>
        <View
          style={{paddingHorizontal: 60, marginTop: 10, flexDirection: 'row'}}>
          {fromDate && toDate && (
            <FlatList
              data={getDaysInRange()}
              renderItem={({item}) => (
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                  <Text style={styles.textItem}>
                    {format(item, 'dd/MM/yyyy')}
                  </Text>
                  <TouchableOpacity
                    style={{paddingHorizontal: 60}}
                    onPress={() => setModalType(true)}>
                    <Text style={styles.textItem}>{dropdownValue}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => format(item, 'yyyy-MM-dd')}
            />
          )}
          {(!fromDate || !toDate) && (
            <Text style={styles.textItem}>
              {format(new Date(), 'dd/MM/yyyy')}
            </Text>
          )}

          <Modal
            visible={modalType}
            transparent={true}
            onRequestClose={() => setModalType(false)}
            animationType="slide">
            <View style={styles.centeredView}>
              <View style={styles.modalView2}>
                <TouchableOpacity
                  onPress={() => handleDropdownChange('Toàn ca')}>
                  <Text style={styles.text}>Toàn ca</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDropdownChange('Sau ca')}>
                  <Text style={styles.text}>Sau ca</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDropdownChange('Trước ca')}>
                  <Text style={styles.text}>Trước ca</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.line2} />
        <View style={{margin: 10}}>
          <Text style={styles.text}>Lý do:</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setNote(text)}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          justifyContent: 'space-between',
        }}>
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
    </View>
  );
};

export default CreateLeave;
const {height} = Dimensions.get('window');
const modalHeight = height / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    paddingHorizontal: 230,
    margin: 5,
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 390,
    marginLeft: 10,
    bottom: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  textItem: {
    marginLeft: 10,
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
  line2: {
    marginTop: 10,
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 390,
    marginLeft: 10,
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
  modalView2: {
    backgroundColor: 'white',
    width: 150,
    elevation: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#3F3F3F',
  },
  input: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  placeholder: {
    fontSize: 20,
    color: '#3F3F3F',
    padding: 5,
  },
  textSelect: {
    fontSize: 16,
    color: '#3F3F3F',
    padding: 5,
  },
});
