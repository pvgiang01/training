import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';
import SvgCalendar from '../../assets/svg/CalendarSvg';
import SvgImg from '../../assets/svg/ImgSvg';
import SvgPdf from '../../assets/svg/PdfSvg';
import SvgSend from '../../assets/svg/SendSvg';
import ListItem from '../../component/ListItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {API_CREATE_HAVE_CHILD} from '../../repository/Type';
import {useAppSelector} from '../../redux/store';
import DatePicker from '../../component/DatePicker';
import {useNavigation} from '@react-navigation/native';
import DownOutlined from '../../component/Icons/DownOutlined';
import Modal from '../../component/Modal';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ListInput from '../../component/ListInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
const CreateChild = () => {
  const access_token = useAppSelector(state => state.auth.access_token);
  const auth = useAppSelector(state => state.auth);

  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [showCalendarFromDate, setShowCalendarFromDate] = useState(false);

  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [showCalendarToDate, setShowCalendarToDate] = useState(false);

  const [register_type, setRegister_type] = useState('cn');

  const [birthday_child, setBirthday_child] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [showCalendarChildDate, setShowCalendarChildDate] = useState(false);

  const [nameChild, setNameChild] = useState('');
  const [modalAttchment, setModalAttchement] = useState(false);

  const [imageData, setImageData] = useState();
  const [fileName, setFileName] = useState();
  const [pdfPicker, setPdfPicker] = useState();

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [note, setNote] = useState();

  const [modalType, setModalType] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const typeHaveChild = [
    {
      lable: 'Đến muộn 1h đầu ca',
      value: 'm1',
    },
    {
      lable: 'Đến muộn 1h sau ăn ca',
      value: 'm2',
    },
    {
      lable: 'Về sớm 1h cuối ca',
      value: 's1',
    },
    {
      lable: 'Về sớm 1h trước ăn ca',
      value: 's2',
    },
  ];

  const handleCreateHaveChild = ({action_send}) => {
    fetch(API_CREATE_HAVE_CHILD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        employee_id: auth.employee_id.id,
        register_type: register_type,
        name_child: nameChild,
        birthday_child: birthday_child,
        type: selectedType,
        from_date: fromDate,
        to_date: toDate,
        note: note,
        action_send: action_send,
        attachment: {
          name: fileName,
          value: imageData,
        },
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.status) {
          navigation.goBack();
        } else {
          ToastAndroid.show(json.result.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  const checkValidate = () => {
    Keyboard.dismiss();
    if (moment(toDate).diff(moment(fromDate), 'days') < 0) {
      return ToastAndroid.show(
        'Từ ngày không thể lớn hơn đến ngày!',
        ToastAndroid.SHORT,
      );
    }
    if (!nameChild || nameChild?.trim() == '') {
      return ToastAndroid.show(
        'Trường tên con không được để trống',
        ToastAndroid.SHORT,
      );
    }
    if (!note || note?.trim() == '') {
      return ToastAndroid.show(
        'Trường lí do không được để trống',
        ToastAndroid.SHORT,
      );
    }
    return true;
  };

  const onSave = () => {
    if (checkValidate()) {
      handleCreateHaveChild({action_send: false});
    }
  };

  const onSend = () => {
    if (checkValidate()) {
      handleCreateHaveChild({action_send: true});
    }
  };
  const onClose = () => {
    navigation.goBack();
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User canceled imagePicker');
      } else if (response.errorCode) {
        console.log(response.errorCode, 'err');
      } else {
        setImageData(response.assets[0].base64);
        setFileName(response.assets[0].fileName);
      }
      setIsFileSelected(true);
      setModalAttchement(false);
    });
  };

  const selectPdfPicker = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setPdfPicker(doc[0].name);
      setIsFileSelected(true);
    } catch (error) {
      if (DocumentPicker.isCancel(error))
        console.log('User cancelled the upload', error);
      else console.log(error);
    }
    setModalAttchement(false);
  };

  const handleSelectType = value => {
    setSelectedType(value);
    setModalType(false);
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
              auth?.employee_id?.x_employee_code +
              ' - ' +
              auth?.employee_id?.name
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
            rightComponent={<SvgCalendar />}
          />
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: 1,
            }}>
            <ListInput
              title={'Tên con'}
              rightComponent={
                <TextInput
                  value={nameChild}
                  onChangeText={text => setNameChild(text)}
                  multiline={true}
                />
              }
            />
          </View>
          <ListItem
            title={'Ngày sinh của con'}
            subtitle={moment(birthday_child, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            onPress={() => {
              setShowCalendarChildDate(true);
            }}
            rightComponent={<SvgCalendar />}
          />
          <ListItem
            title={'Lựa chọn chế độ'}
            subtitle={
              selectedType
                ? typeHaveChild.find(item => item.value == selectedType).lable
                : 'Đến muộn 1h đầu ca'
            }
            onPress={() => setModalType(true)}
            rightComponent={<DownOutlined />}
          />
          <ListItem
            title={'Đính kèm hình ảnh giấy khai sinh'}
            subtitle={'Chọn'}
            onPress={() => {
              setModalAttchement(true);
            }}
            rightComponent={<DownOutlined />}
          />
          {isFileSelected && (
            <Text
              style={{
                marginLeft: 10,
                margin: 10,
                marginTop: 10,
                fontSize: 15,
                color: '#016243',
              }}>
              {fileName || pdfPicker}
            </Text>
          )}
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
          />
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <TouchableOpacity style={styles.btnSave} onPress={onSave}>
            <MaterialCommunityIcons
              name="content-save-outline"
              size={17}
              color="white"
              style={{margin: 5}}
            />
            <Text style={{color: 'white', fontSize: 20}}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btSent} onPress={onSend}>
            <SvgSend style={{marginRight: 5}} />
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

        <Modal animationType="fade" transparent={true} visible={modalAttchment}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={selectImage}
                style={{flexDirection: 'row'}}>
                <SvgImg />
                <Text style={styles.modalText}>Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={selectPdfPicker}
                style={{flexDirection: 'row', margin: 5}}>
                <SvgPdf />
                <Text style={[styles.modalText, {left: 5}]}>Pdf</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalType}
          onRequestClose={() => setModalType(false)}>
          <View style={styles.modalType}>
            {typeHaveChild.map(item => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleSelectType(item.value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <View>
                  {selectedType === item.value}
                </View>
                <Text style={styles.textType}>{item.lable}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
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
      <DatePicker
        visible={showCalendarChildDate}
        onClose={() => {
          setShowCalendarChildDate(false);
        }}
        value={birthday_child}
        onDayChange={value => {
          setBirthday_child(value);
          setShowCalendarChildDate(false);
        }}
      />
    </>
  );
};

export default CreateChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    minHeight: 100,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 17,
    textAlignVertical: 'top',
  },
  inputChild: {
    right: 40,
    fontSize: 17,
  },
  btnSave: {
    backgroundColor: '#016243',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btSent: {
    backgroundColor: '#2eb8b8',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  btnCance: {
    backgroundColor: '#595959',
    height: 40,
    width: 125,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    paddingTop: 430,
    paddingRight: 60,
  },
  modalView: {
    backgroundColor: 'white',
    paddingHorizontal: 120,
    paddingVertical: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'black',
    fontSize: 15,
  },
  modalType:{
    padding:20,
    backgroundColor:'white',
    borderRadius:10,
    paddingRight:80,
    marginRight:120,
    marginTop:200
  },
  textType:{
    fontSize:16,
    color:'black'
  }
});
