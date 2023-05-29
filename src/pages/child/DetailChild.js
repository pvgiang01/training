import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Modal,
} from 'react-native';
import SvgCalendar from '../../assets/svg/CalendarSvg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DownOutlined from '../../component/Icons/DownOutlined';
import ListItem from '../../component/ListItem';
import {useAppSelector} from '../../redux/store';
import {
  API_DETAIL_HAVE_CHILD,
  API_HAVE_CHILD_ACTION,
} from '../../repository/Type';
import {useNavigation} from '@react-navigation/native';
import SvgSend from '../../assets/svg/SendSvg';
import SvgEdit from '../../assets/svg/EditSvg';
import SvgDelete from '../../assets/svg/DeleteSvg';
import SvgBack from '../../assets/svg/BackSvg';
import ImageViewer from 'react-native-image-zoom-viewer';
export const DetailChild = ({route}) => {
  const navigation = useNavigation();
  const access_token = useAppSelector(state => state.auth.access_token);
  const auth = useAppSelector(state => state.auth);

  const child_id = route.params.child_id;
  const [dataDetail, setDataDetail] = useState();

  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetch(API_DETAIL_HAVE_CHILD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        have_child_id: child_id,
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

  const handleActionHaveChild = ({action}) => {
    fetch(API_HAVE_CHILD_ACTION, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
        have_child_id: child_id,
        action: action,
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
  const onBackToDraft = () => {
    handleActionHaveChild({action: 'back_to_draft'});
  };
  const onSend = () => {
    handleActionHaveChild({action: 'send'});
  };
  const onDelete = () => {
    handleActionHaveChild({action: 'delete'});
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

  const handleImagePress = index => {
    setImageIndex(index);
    setVisible(true);
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

          <ListItem
            title={'Từ ngày'}
            subtitle={moment(dataDetail?.value?.from_date, 'YYYY-MM-DD').format(
              'DD/MM/YYYY',
            )}
            rightComponent={<SvgCalendar />}
          />

          <ListItem
            title={'Đến ngày'}
            subtitle={moment(dataDetail?.value?.to_date, 'YYYY-MM-DD').format(
              'DD/MM/YYYY',
            )}
            rightComponent={<SvgCalendar />}
          />
          <ListItem
            title={'Tên con'}
            subtitle={dataDetail?.value?.name_child}
          />
          <ListItem
            title={'Ngày sinh của con'}
            subtitle={moment(
              dataDetail?.value?.birthday_child,
              'YYYY-MM-DD',
            ).format('DD/MM/YYYY')}
            rightComponent={<SvgCalendar />}
          />
          <ListItem
            title={'Lựa chọn chế độ'}
            subtitle={dataDetail?.value?.type}
            rightComponent={<DownOutlined />}
          />
          <ListItem
            title={'Đính kèm hình ảnh giấy khai sinh'}
            rightComponent={<DownOutlined />}
          />

          <Text
            onPress={() => handleImagePress(0)}
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontSize: 15,
              color: '#016243',
            }}>
            {dataDetail?.value?.attachments[0]?.name}
          </Text>

          <ListItem
            title={'Lý do'}
            bottomDivider={false}
            bottomComponent={
              <Text style={styles.textNote}>{dataDetail?.value?.note}</Text>
            }
          />
          <ListItem
            title={'Trạng thái'}
            subtitle={dataDetail?.value?.stage_id}
          />
        </KeyboardAwareScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {updateButton && (
            <TouchableOpacity style={styles.btSent} onPress={() => {}}>
              <SvgEdit style={{marginRight: 5}} />
              <Text style={{color: 'white', fontSize: 20}}>
                {updateButton.name}
              </Text>
            </TouchableOpacity>
          )}
          {backtoDraft && (
            <TouchableOpacity
              style={styles.btnBacktoDraft}
              onPress={onBackToDraft}>
              <SvgBack style={{marginRight: 10}} />
              <Text style={{color: 'white', fontSize: 20}}>
                {backtoDraft.name}
              </Text>
            </TouchableOpacity>
          )}
          {deleteButton && (
            <TouchableOpacity onPress={onDelete} style={styles.btnDelete}>
              <SvgDelete style={{marginRight: 10}} />
              <Text style={{color: 'white', fontSize: 20}}>
                {deleteButton.name}
              </Text>
            </TouchableOpacity>
          )}
          {sendButton && (
            <TouchableOpacity onPress={onSend} style={styles.btSent}>
              <SvgSend style={{marginRight: 10}} />
              <Text style={{color: 'white', fontSize: 20}}>
                {sendButton.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Modal visible={visible} transparent={true}>
          <ImageViewer
            imageUrls={[
              {
                url: dataDetail?.value?.attachments[0]?.url,
              },
            ]}
            index={imageIndex}
            onSwipeDown={() => setVisible(false)}
            enableSwipeDown={true}
            renderIndicator={() => null}
            style={{flex: 1}}
          />
        </Modal>
      </View>
    </>
  );
};

export default DetailChild;

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
