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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../redux/store';
import {API_GET_REMAIN_LEAVE, API_GET_TYPE_LEAVE} from '../../repository/Type';
import {Calendar} from 'react-native-calendars';
import localConfigCalendar from '../../component/LocalConfig';
import moment from 'moment';
import ModalCalendar from '../../component/ModalCalendar';
import RNPickerSelect from 'react-native-picker-select';
import {eachDayOfInterval, format} from 'date-fns';
export const CreateLeave = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  const [isSelected, setIsSelected] = useState(false);
  const [input, setInput] = useState();
  const [dataLeave, setDataLeave] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [fromDate, setFormDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [typeLeave, setTypeLeave] = useState('');
  const [selectedTypeLeave, setSelectedTypeLeave] = useState('');
  const currentDate = moment().format('DD/MM/YYYY');
  localConfigCalendar;

  useEffect(() => {
     function getRemainLeave(){
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
    };
    getRemainLeave();
  }, []);

  useEffect(() => {
    function getTypeLeave(){
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
    };
    getTypeLeave();
  }, []);
  
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
  const getDaysInRange = () => {
    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      const days = eachDayOfInterval({start: fromDateObj, end: toDateObj});
      return days;
    } else if (toDate) {
      const fromDateObj = new Date();
      const toDateObj = new Date(toDate);
      const days = eachDayOfInterval({start: fromDateObj, end: toDateObj});
      return days;
    } else if (fromDate) {
      return [new Date(fromDate)];
    } else {
      return [];
    }
  };
  const updatePickerSelected = (value) => {
    console.log(` Selected value: ${value}`)
    }
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
          {/* <RNPickerSelect
            placeholder={{label: 'Chọn loại nghỉ phép', value: null}}
            items={typeLeave}
            onValueChange={updatePickerSelected}
            value={selectedTypeLeave}
          /> */}
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
        <View style={{marginLeft: 80, marginTop: 10, flexDirection: 'row'}}>
          {fromDate && toDate && (
            <FlatList
              data={getDaysInRange()}
              renderItem={({item}) => (
                <View style={{marginTop: 10}}>
                  <Text style={styles.textItem}>
                    {format(item, 'dd/MM/yyyy')}
                  </Text>
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
             <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
            
            ]}
        />
        </View>
        <View style={styles.line2} />
        <View style={{margin: 10}}>
          <Text style={styles.text}>Lý do:</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setInput(text)}
          />
        </View>
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
    </View>
  );
}

export default CreateLeave;
const {height} = Dimensions.get('window');
const modalHeight = height / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
