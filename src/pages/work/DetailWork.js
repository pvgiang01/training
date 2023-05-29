import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/store';
import {API_DETAIL_WORK} from '../../repository/Type';
import moment from 'moment';
import ListItem from '../../component/ListItem';
import SvgEdit from '../../assets/svg/EditSvg';
import SvgSend from '../../assets/svg/SendSvg';
const DetailWork = ({route}) => {
  const access_token = useAppSelector(state => state.auth.access_token);
  const {work_entry_id} = route.params;
  
  const [workId, setWorkId] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
      fetch(API_DETAIL_WORK, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: access_token,
          work_entry_id: work_entry_id,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.result?.status) {
            const data = json.result?.data;
            setWorkId(data);
            setShowButton(true);
          }
        })
        .catch(error => console.log('Error:', error));
    
  }, []);

  const renderButton = (name, onPress, extraStyle = {}) => {
    return (
      <TouchableOpacity style={[styles.btn, extraStyle]} onPress={onPress}>
        <Text style={styles.textBtn}>{name}</Text>
      </TouchableOpacity>
    );
  };
  const updateButton = workId?.button?.find(button => button.key === 'update');
  const sendButton = workId?.button?.find(button => button.key === 'send');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewDate}>
          <Text style={styles.textDate}>
            Ngày {moment(workId?.value?.date?.value, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          </Text>
        </View>
        <ListItem
          title={'Nhân sự'}
          subtitle={
            workId?.value?.employee?.value?.code + '-' + workId?.value?.employee?.value?.name
          }
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{paddingLeft: 10, paddingTop: 10, flexDirection: 'row'}}>
            <Text style={styles.text}>Giờ vào:</Text>
            <Text style={styles.textItem}>
              {workId?.value?.date_start?.value}
            </Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', right: 20}}>
            <Text style={styles.text}>Giờ ra:</Text>
            <Text style={[styles.textItem, {width: '50%'}]}>
              {workId?.value?.date_stop?.value}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.lineTimeIn} />
          <View style={[styles.lineTimeOut]} />
        </View>
        <ListItem
          title={'Trạng thái'}
          subtitle={workId?.value?.stage_name?.value}
        />
        <ListItem
          title={'Kết quả chấm công'}
          subtitle={workId?.value?.type?.value?.name}
        />
      </View>
      {showButton && (
        <View style={{flexDirection: 'row'}}>
          {updateButton &&
            renderButton(
              <View style={{flexDirection: 'row'}}>
                <SvgEdit style={{top: 5, right: 5}} />
                <Text style={styles.textBtn}>{updateButton.name}</Text>
              </View>,
              () => {
                // Xử lý khi nhấn nút "Sửa"
              },
              sendButton ? {} : {flex: 1},
            )}
          {sendButton &&
            renderButton(
              <View style={{flexDirection: 'row'}}>
                <SvgSend style={{right: 5, top: 5}} />
                <Text style={styles.textBtn}>{sendButton.name}</Text>
              </View>,
              () => {},
            )}
        </View>
      )}
    </>
  );
};
export default DetailWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#2eb8b8',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 70,
  },
  textBtn: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'ChakraPetch-Light',
  },
  viewDate: {
    alignItems: 'center',
    marginTop: 10,
  },
  textHeader: {
    fontFamily: 'Chakra-Petch',
    fontSize: 22,
    color: '#016243',
  },
  textDate: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 390,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  textItem: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Chakra-Petch',
    width: '46%',
    paddingLeft: 20,
  },
  lineTimeIn: {
    height: 1,
    paddingHorizontal: 100,
    backgroundColor: '#d9d9d9',
  },
  lineTimeOut: {
    height: 1,
    paddingHorizontal: 90,
    backgroundColor: '#d9d9d9',
    left: 30,
  },
});
