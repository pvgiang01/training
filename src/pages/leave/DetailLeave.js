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
import Dropdown from '../../component/Dropdown';
import ListItem from '../../component/ListItem';
import DatePicker from '../../component/DatePicker';
import {useAppSelector} from '../../redux/store';
import {
  API_GET_LEAVE_LINES,
  API_GET_TYPE_LEAVE,
  API_DETAIL_LEAVE,
  API_ACTION_LEAVE,
  API_UPDATE_LEAVE,
} from '../../repository/Type';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import SvgBack from '../../assets/svg/BackSvg';
import SvgSend from '../../assets/svg/SendSvg';
import SvgEdit from '../../assets/svg/EditSvg';
import SvgDelete from '../../assets/svg/DeleteSvg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const DetailLeave = ({route}) => {
  const navigation = useNavigation();
  const access_token = useAppSelector(state => state.auth.access_token);
  const auth = useAppSelector(state => state.auth);
  const leave_id = route.params.leave_id;

  const [fromDate, setFromDate] = useState();
  const [showCalendarFromDate, setShowCalendarFromDate] = useState(false);

  const [toDate, setToDate] = useState();
  const [showCalendarToDate, setShowCalendarToDate] = useState(false);

  const [usedTimeOffFund, setUsedTimeOffFund] = useState(false);
  const [buttonUpdate, setButtonUpdate] = useState(false);

  const [visibleModalType, setVisibleModalType] = useState(false);
  const [typeId, setTypeId] = useState();
  const [typeLeave, setTypeLeave] = useState([]);

  const [dataDetail, setDataDetail] = useState();
  const [used_time_off_fund,setUsed_time_off_fund] = useState();
  const [lines, setLines] = useState([]);
  const [isVisibleModalLine, setVisibleModalLine] = useState(false);
  const [currentLine, setCurrentLine] = useState({});

  const [note, setNote] = useState(dataDetail?.value?.note);

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
    function getTypeLeave() {
      fetch(API_GET_TYPE_LEAVE, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: access_token,
          used_time_off_fund:false
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

  const handleActionLeave = ({action}) => {
    fetch(API_ACTION_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        leave_id: leave_id,
        action: action,
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

  useEffect(() => {
    fetch(API_DETAIL_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        leave_id: leave_id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.status) {
          const data = json.result?.data;
          setDataDetail(data);
        }
      })
      .catch(error => console.log('Error: ', error));
  }, []);

  const handleUpdateLeave = () => {
    fetch(API_UPDATE_LEAVE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        leave_id: leave_id,
        employee_id: auth.employee_id.id,
        type_id: typeId,
        from_date: fromDate,
        to_date: toDate,
        used_time_off_fund: usedTimeOffFund,
        note: note,
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
  useEffect(() => {
    if (buttonUpdate) {
      setNote(dataDetail?.value?.note);
      setFromDate(dataDetail?.value?.from_date);
      setToDate(dataDetail?.value?.to_date);
      setUsedTimeOffFund(dataDetail?.value?.used_time_off_fund);
      setLines(dataDetail?.value?.lines);
    }
  }, [buttonUpdate, dataDetail]);
  const backtodraft = () => {
    handleActionLeave({action: 'back_to_draft'});
  };
  const onDelete = () => {
    handleActionLeave({action: 'delete'});
  };
  const onSent = () => {
    handleActionLeave({action: 'send'});
  };
  const backtoDraft = dataDetail?.button?.find(
    button => button.key === 'back_to_draft',
  );
  const updateButton = dataDetail?.button?.find(
    button => button.key === 'update',
  );
  const sendButton = dataDetail?.button?.find(button => button.key === 'send');
  const deleteButton = dataDetail?.button?.find(
    button => button.key === 'delete',
  );

  const onUpdate = () => {
    setButtonUpdate(true);
  };
  const onClose = () => {
    navigation.goBack();
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
            <Entypo name="chevron-thin-down" size={14} color="#3F3F3F" />
          </TouchableOpacity>
        </View>
      </>
    );
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
              dataDetail?.value?.employee?.code +
              ' - ' +
              dataDetail?.value?.employee?.name
            }
          />
          <ListItem
            title={'Phòng ban'}
            subtitle={dataDetail?.value?.department?.name}
          />
          {buttonUpdate ? (
            <ListItem
              title={'Từ ngày'}
              subtitle={moment(fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              onPress={() => setShowCalendarFromDate(true)}
              rightComponent={<SvgCalendar />}
            />
          ) : (
            <ListItem
              title={'Từ ngày'}
              subtitle={moment(
                dataDetail?.value?.from_date,
                'YYYY-MM-DD',
              ).format('DD/MM/YYYY')}
              rightComponent={<SvgCalendar />}
            />
          )}

          {buttonUpdate ? (
            <ListItem
              title={'Đến ngày'}
              subtitle={moment(toDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              onPress={() => setShowCalendarToDate(true)}
              rightComponent={<SvgCalendar />}
            />
          ) : (
            <ListItem
              title={'Đến ngày'}
              subtitle={moment(dataDetail?.value?.to_date, 'YYYY-MM-DD').format(
                'DD/MM/YYYY',
              )}
              rightComponent={<SvgCalendar />}
            />
          )}
          <ListItem
            title={'Số ngày nghỉ còn lại'}
            subtitle={dataDetail?.value?.remain_leave}
          />
          {buttonUpdate ? (
            <>
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
                  subtitle={dataDetail?.value?.remaining_hours}
                />
              )}
            </>
          ) : (
            <>
              <ListItem
                title={'Sử dụng quỹ nghỉ bù'}
                rightComponent={
                  <Checkbox
                    value={dataDetail?.value?.used_time_off_fund}
                    disabled={true}
                  />
                }
              />
              {dataDetail?.value?.used_time_off_fund && (
                <ListItem
                  title={'Số giờ nghỉ bù còn lại'}
                  subtitle={dataDetail?.value?.remaining_hours}
                />
              )}
            </>
          )}
          {buttonUpdate ? (
            <ListItem
              title={'Loại nghỉ phép'}
              rightComponent={
                <Dropdown
                  placeholder={dataDetail?.value?.type?.name}
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
                  onChange={value =>{
                    handleSelectTypeLeave(value)
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
                    ItemSeparatorComponent={() => (
                      <View
                        style={{borderBottomWidth: 1, borderColor: '#d9d9d9'}}
                      />
                    )}
                  />
                </>
              }
            />
          ) : (
            <ListItem
              title={'Loại nghỉ phép'}
              rightComponent={
                <Dropdown
                  placeholder={dataDetail?.value?.type?.name}
                  visible={visibleModalType}
                  data={typeLeave}
                />
              }
              bottomComponent={
                <>
                  <View style={styles.sheetMenu}>
                    <Text style={styles.menuLabel}>Ngày</Text>
                    <Text style={styles.menuLabel}>Buổi nghỉ</Text>
                  </View>
                  <FlatList
                    scrollEnabled={false}
                    data={dataDetail?.value?.lines}
                    renderItem={renderLineItem}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{borderBottomWidth: 1, borderColor: '#d9d9d9'}}
                      />
                    )}
                  />
                </>
              }
            />
          )}

          <ListItem
            title={'Lý do'}
            bottomDivider={false}
            bottomComponent={
              <>
                {buttonUpdate ? (
                  <>
                    <TextInput
                      value={note}
                      onChangeText={text => setNote(text)}
                      style={styles.input}
                      numberOfLines={5}
                      multiline={true}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.textNote}>
                      {dataDetail?.value?.note}
                    </Text>
                  </>
                )}
              </>
            }
          />
          <ListItem title={'Trạng thái'} subtitle={dataDetail?.value?.state} />
        </KeyboardAwareScrollView>

        {buttonUpdate ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.btnUpdate}
              onPress={handleUpdateLeave}>
              <Text style={{color: 'white', fontSize: 20}}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCanceUpdate} onPress={onClose}>
              <MaterialCommunityIcons
                name="close-box-multiple"
                size={17}
                color="white"
                style={{margin: 5}}
              />
              <Text style={{color: 'white', fontSize: 20}}>Hủy sửa</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {updateButton && (
              <TouchableOpacity style={styles.btSent} onPress={onUpdate}>
                <SvgEdit
                  style={{marginRight: 5}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {updateButton.name}
                </Text>
              </TouchableOpacity>
            )}
            {backtoDraft && (
              <TouchableOpacity
                style={styles.btnBacktoDraft}
                onPress={backtodraft}>
                <SvgBack
                  style={{marginRight: 10}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {backtoDraft.name}
                </Text>
              </TouchableOpacity>
            )}
            {deleteButton && (
              <TouchableOpacity onPress={onDelete} style={styles.btnDelete}>
                <SvgDelete
                  style={{marginRight: 10}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {deleteButton.name}
                </Text>
              </TouchableOpacity>
            )}
            {sendButton && (
              <TouchableOpacity onPress={onSent} style={styles.btSent}>
                <SvgSend
                  style={{marginRight: 10}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {sendButton.name}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <Dropdown
        value={currentLine?.type}
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
      <DatePicker
        visible={showCalendarFromDate}
        onClose={() => {
          setShowCalendarFromDate(false);
        }}
        value={fromDate}
        onDayChange={value => {
          setFromDate(value);
          setShowCalendarFromDate(false);
        }}
      />
      <DatePicker
        visible={showCalendarToDate}
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

export default DetailLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  btnUpdate: {
    paddingHorizontal: 50,
    backgroundColor: '#016243',
    bottom: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnCanceUpdate: {
    paddingHorizontal: 50,
    backgroundColor: '#595959',
    bottom: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnBacktoDraft: {
    backgroundColor: '#ac3973',
    width: '100%',
    padding: 5,
    bottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btSent: {
    backgroundColor: '#2eb8b8',
    padding: 5,
    bottom: 5,
    paddingHorizontal: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnDelete: {
    backgroundColor: '#016243',
    padding: 5,
    paddingHorizontal: 32,
    bottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    fontSize: 17,
    color: 'black',
  },
  textItem: {
    fontSize: 17,
    color: 'black',
  },
  textNote: {
    fontSize: 17,
    textAlignVertical: 'top',
    paddingLeft: 10,
    color: 'black',
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
