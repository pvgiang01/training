import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/store';
import {API_DETAIL_NOTIFICATIONS} from '../../repository/Type';
import moment from 'moment';
const DetailNotification = ({route}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  let {message} = route.params;
  const [dataNotifications, setDataNotifications] = useState([]);

  useEffect(() => {
    fetch(API_DETAIL_NOTIFICATIONS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: access_token,
        message_id: message,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.status) {
          const data = json.result.data;
          setDataNotifications(data);
        } else {
          console.log('Failed!!');
        }
      })
      .catch(error => console.log('Error: ', error));
  }, []);
  convertDate = /(\d{1,2})\/(\d{1,2})\/(\d{4})/; // Tạo biểu thức chính quy để tìm ngày
  const match = message.match(convertDate); // Tìm kiếm ngày trong chuỗi
  let date = '';
  let fomatDate = '';
  if (match) {
    const day = match[1];
    const month = match[2];
    const year = match[3];
    date = new Date(`${year}-${month}-${day}`); // Tạo đối tượng Date từ ngày, tháng, năm
    // console.log(date.toLocaleDateString()); // Hiển thị ngày dưới dạng chuỗi địa phương (VD: "31/05/2023" ở Việt Nam)
    fomatDate = moment(date).format('DD/MM/YYYY')
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewDate}>
        <Text style={styles.textDate}>Ngày {fomatDate}</Text>
      </View>
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Nhân sự:</Text>
        <Text style={[styles.text, {marginLeft: 10}]}>
          VH000784-Bùi Tiến Dũng
        </Text>
      </View>
      <View style={styles.line} />
      <View style={{flexDirection: 'row'}}>
        <View style={{margin: 10, flexDirection: 'row', top: 20}}>
          <Text style={styles.text}>Giờ vào:</Text>
        </View>
        <View
          style={{margin: 10, flexDirection: 'row', top: 20, marginLeft: 120}}>
          <Text style={styles.text}>Giờ ra:</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.lineTime, {margin: 15}]} />
        <View style={[styles.lineTime, {top: 15}]} />
      </View>
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Trạng thái:</Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '400',
            marginLeft: 10,
            marginTop: 5,
          }}>
          Không hợp lệ
        </Text>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row', marginTop: 15}}>
        <Text style={styles.text}>Kết quả chấm công:</Text>
      </View>
      <View style={[styles.line]} />
    </View>
  );
};
export default DetailNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewDate: {
    alignItems: 'center',
    marginTop: 19,
  },
  textDate: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 390,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  lineTime: {
    height: 1,
    width: 185,
    backgroundColor: '#d9d9d9',
  },
});
