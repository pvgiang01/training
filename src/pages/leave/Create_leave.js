import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  ToastAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgCalendar from '../../assets/svg/CalendarSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Checkbox from '../../component/Checkbox';
import DatePicker from '../../component/DatePicker';
import Dropdown from '../../component/Dropdown';
import ListItem from '../../component/ListItem';
import {useAppSelector} from '../../redux/store';
import {
  API_CREATE_LEAVE,
  API_GET_LEAVE_LINES,
  API_GET_REMAIN_LEAVE,
  API_GET_TYPE_LEAVE,
} from '../../repository/Type';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native';
import SvgSend from '../../assets/svg/SendSvg';
export const CreateLeave = () => {
  const access_token = useAppSelector(state => state.auth.access_token);
  const auth = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [showCalendarFromDate, setShowCalendarFromDate] = useState(false);

  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [showCalendarToDate, setShowCalendarToDate] = useState(false);

  const [usedTimeOffFund, setUsedTimeOffFund] = useState(false);
  const [visibleModalType, setVisibleModalType] = useState(false);
  
  const [typeId, setTypeId] = useState();
  const [typeLeave, setTypeLeave] = useState([]);

  const [dataLeave, setDataLeave] = useState();
  const [used_time_off_fund,setUsed_time_off_fund] = useState(false);

  const [lines, setLines] = useState([]);
  const [isVisibleModalLine, setVisibleModalLine] = useState(false);

  const [currentLine, setCurrentLine] = useState({});
  const [note, setNote] = useState();

  const lineType = [
    {
      label: 'Toàn ca',
      value: 'full',
    },
    {
      label: 'Trước ca',
      value: 'before',
    },
    {
      label: 'Sau ca',
      value: 'after',
    },
  ];

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
          used_time_off_fund:used_time_off_fund
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
  }, [used_time_off_fund]);

  useEffect(() => {
    function getLeaveLines() {
      fetch(API_GET_LEAVE_LINES, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: access_token,
          from_date: fromDate,
          to_date: toDate,
          employee_id: auth.employee_id.id,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.status) {
            const data = json.result.data.data;
            const result = data.map(item => ({
              date: item.date.value,
              type: 'full',
            }));
            setLines(result);
          }
        })
        .catch(error => console.log('Error: ', error));
    }
    getLeaveLines();
  }, [fromDate, toDate]);

  const handleCreateLeave = ({action_send}) => {
    fetch(API_CREATE_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        employee_id: auth.employee_id.id,
        type_id: typeId,
        from_date: fromDate,
        to_date: toDate,
        used_time_off_fund: usedTimeOffFund,
        note: note,
        action_send: action_send,
        lines: lines,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.code == 200) {
          navigation.goBack();
        } else {
          // Alert.alert(data.result.message);
          ToastAndroid.show(data.result.message, ToastAndroid.SHORT);

        }
      })
      .catch(e => {
        console.warn(e);
      });
  };

  const handleSelectTypeLeave = value => {
    setTypeId(value);
    setVisibleModalType(false);
  };

  const onPressLineItem = item => {
    setVisibleModalLine(true);
    setCurrentLine(item);
  };

  const onValueChangeLineItem = value => {
    const updatedLines = lines.map(line => {
      if (line.date == currentLine.date) {
        return {...line, type: value};
      }
      return line;
    });
    setLines(updatedLines);
    setVisibleModalLine(false);
  };

  const renderLineItem = ({item}) => {
    const findName = lineType.find(e => e.value == item.type);

    return (
      <>
        <View style={styles.lineItem}>
          <Text style={styles.textItem}>
            {moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onPressLineItem(item);
            }}
            style={styles.viewLineItemRight}>
            <Text style={styles.lineStatus}>{findName?.label}</Text>
            <Entypo name="chevron-thin-down" size={14} color="#3F3F3F"/>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const checkValidate = () => {
    Keyboard.dismiss();
    if (moment(toDate).diff(moment(fromDate), 'days') < 0) {
      return ToastAndroid.show('Từ ngày không thể lớn hơn đến ngày!', ToastAndroid.SHORT);
    }
    if (lines.length === 0) {
      ToastAndroid.show('Chi tiết đơn xin nghỉ không có!', ToastAndroid.SHORT);

    }
    if (!note || note?.trim() == '') {
      return ToastAndroid.show('Trường lý do không được để trống!', ToastAndroid.SHORT);
    }
    if (!typeId) {
      return ToastAndroid.show('Chưa chọn loại nghỉ phép!', ToastAndroid.SHORT);
    }
    return true;
  };

  const onSave = () => {
    if (checkValidate()) {
      handleCreateLeave({action_send: false});
    }
  };

  const onSent = () => {
    if (checkValidate()) {
      handleCreateLeave({action_send: true});
    }
  };
  const onClose = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <ListItem
            title={'Nhân sự'}
            subtitle={
              auth?.employee_id?.x_employee_code + ' - ' + auth?.employee_id?.name
            }
          />
          <ListItem title={'Phòng ban'} subtitle={auth?.department_id?.name} />
          <ListItem
            title={'Từ ngày'}
            subtitle={moment(fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            onPress={() => {
              setShowCalendarFromDate(true);
            }}
            rightComponent={<SvgCalendar />}
          />
          <ListItem
            title={'Đến ngày'}
            subtitle={moment(toDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            onPress={() => {
              setShowCalendarToDate(true);
            }}
            rightComponent={<SvgCalendar/>}
          />
          <ListItem
            title={'Số ngày nghỉ còn lại'}
            subtitle={dataLeave?.remain_leave}
          />
          <ListItem
            title={'Sử dụng quỹ nghỉ bù'}
            rightComponent={
              <Checkbox
                onChange={newValue => setUsedTimeOffFund(newValue)}
                value={usedTimeOffFund}
                disabled={false}
              />
            }
          />
          {usedTimeOffFund && (
            <ListItem
              title={'Số giờ nghỉ bù còn lại'}
              subtitle={dataLeave?.remaining_hours}
            />
          )}
          <ListItem
            title={'Loại nghỉ phép'}
            rightComponent={
              <Dropdown
                placeholder={'Chọn loại nghỉ phép'}
                value={typeId}
                schema={{
                  label: 'name',
                  value: 'id',
                }}
                visible={visibleModalType}
                data={typeLeave}
                onBackdropPress={() => {
                  setVisibleModalType(false);
                }}
                onRequestClose={() => {
                  setVisibleModalType(false);
                }}
                onChange={value => {
                  handleSelectTypeLeave(value);
                }}
              />
            }
            onPress={() => {
              setVisibleModalType(true);
            }}
            bottomComponent={
              <>
                <View style={styles.sheetMenu}>
                  <Text style={styles.menuLabel}>Ngày</Text>
                  <Text style={styles.menuLabel}>Buổi nghỉ</Text>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={lines}
                  renderItem={renderLineItem}
                  ItemSeparatorComponent={() => 
                  <View style={{borderBottomWidth: 1,borderColor: '#d9d9d9'}}/>}
                />
              </>
            }
          />
          <ListItem
            title={'Lý do'}
            bottomDivider={false}
            bottomComponent={
              <TextInput
                value={note}
                onChangeText={text => setNote(text)}
                style={styles.input}
                numberOfLines={5}
                multiline={true}
              />
            }
            rightStyle={{}}
          />
        </KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.btnSave} onPress={onSave}>
          <MaterialCommunityIcons
                name="content-save-outline"
                size={17}
                color="white"
                style={{margin: 5}}
              />
            <Text style={{color: 'white', fontSize: 20}}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSent} style={styles.btSent}>
            <SvgSend style={{marginRight:5}}/>
            <Text style={{color: 'white', fontSize: 20}}>Gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.btnCance}>
          <MaterialCommunityIcons
                name="close-box-multiple"
                size={17}
                color="white"
                style={{margin: 5}}
              />
            <Text style={{color: 'white', fontSize: 20}}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dropdown value={currentLine?.type}
        visible={isVisibleModalLine}
        data={lineType}
        showLabel={false}
        onBackdropPress={() => {
          setVisibleModalLine(false);
        }}
        onRequestClose={() => {
          setVisibleModalLine(false);
        }}
        onChange={value => {
          onValueChangeLineItem(value);
        }}
      />
      <DatePicker visible={showCalendarFromDate}
        onClose={() => {
          setShowCalendarFromDate(false);
        }}
        value={fromDate}
        onDayChange={value => {
          setFromDate(value);
          setShowCalendarFromDate(false);
        }}
      />
      <DatePicker visible={showCalendarToDate}
        onClose={() => {
          setShowCalendarToDate(false);
        }}
        value={toDate}
        onDayChange={value => {
          setToDate(value);
          setShowCalendarToDate(false);
        }}
      />
    </>
  );
};

export default CreateLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  btnSave: {
    backgroundColor: '#016243',
    height: 40,
    width: 125,
    bottom:5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  btSent: {
    backgroundColor: '#2eb8b8',
    height: 40,
    left:5,
    bottom:5,
    width: 125,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  btnCance: {
    backgroundColor: '#595959',
    height: 40,
    width: 125,
    left:5,
    bottom:5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  sheetMenu: {
    borderTopWidth: 3,
    borderColor: '#016243',
    backgroundColor: '#d9d9d9',
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 17,
    fontFamily: 'Chakra-Petch',
    color: 'black',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  lineItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  viewLineItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineStatus: {
    marginRight: 12,
    fontSize:17,
    color:'black'
  },
  textItem:{
    fontSize:17,
    color:'black'
  },
  input: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    minHeight: 100,
    fontSize: 17,
    textAlignVertical: 'top',
  },
});
