import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View,ToastAndroid} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useAppSelector} from '../../redux/store';
import localConfigCalendar from '../../component/LocalConfig';
import {API_GET_WORK} from '../../repository/Type';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
const WorkScreen = () => {
  const work_entry_id = useRef(0);
  const navigation = useNavigation();

  const access_token = useAppSelector(state => state.auth.access_token);
  const [selectedDate, setSelectedDate] = useState();

  const [markedDates, setMarkedDates] = useState({});
  const [getWork, setGetWork] = useState([]);
  localConfigCalendar;
  useEffect(() => {
    fetch(API_GET_WORK, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: access_token,
        from_date: moment().startOf('year').format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.result?.status) {
          const dataWork = json.result?.data?.app_data?.data;
          setGetWork(dataWork);
          processMarkedDates(dataWork);
        }
      })
      .catch(error => console.log(error));
  }, []);
  const processMarkedDates = dataWork => {
    const markedDatesData = {};
    //lặp qua từng phần từ dataWork.Mỗi vòng lặp customStyle dc tạo ra chứa style cho ngày dc đánh dấu
    dataWork.forEach(work => {
      const {date, state} = work.value;
      const styleKey = state === 'invalidated' ? 'invalidDay' : 'validDay';
      markedDatesData[date] = {
        customStyles: {
          container: {
            backgroundColor: customDatesStyles[styleKey].textStyle.color,
          },
        },
      };
    });

    setMarkedDates(markedDatesData);
  };

  const handleDayPress = day => {
    const dataActive =
    //lọc phần tử getWork giữ lại date.
      getWork.filter(_work => _work.value.date === day.dateString) || [];
    work_entry_id.current = dataActive[0]?.value?.id || 0;
    const date = moment(day.dateString,'YYYY-MM-DD');
    const currentDate = moment();
    if(date.isAfter(currentDate,'day')){
      ToastAndroid.show('Không có đơn phê duyệt',ToastAndroid.SHORT);
      return;
    }
    setSelectedDate(date);
    navigation.navigate('DetailWork', {date, work_entry_id: work_entry_id.current});
  };
  const customDatesStyles = {
    validDay: {
      textStyle: {
        color: '#33cc33',
      },
    },
    invalidDay: {
      textStyle: {
        color: 'red',
      },
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={{height: 340}}
        onDayPress={handleDayPress}
        hideExtraDays={true}
        theme={{
          textDayFontFamily: 'Chakra-Petch',
          textMonthFontFamily: 'ChakraPetch-Light',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 15,
        }}
        customDatesStyles={customDatesStyles}
        markedDates={markedDates}
        markingType="custom"
      />
      <View style={{margin: 20, flex: 1}}>
        <Text
          style={{fontFamily: 'Chakra-Petch', fontSize: 20, color: 'black'}}>
          Chú thích:
        </Text>
        <View style={{flexDirection: 'row', margin: 5, top: 5}}>
          <Octicons
            name="dot-fill"
            size={20}
            color="#33cc33"
            style={{top: 5}}
          />
          <Text style={styles.text}>Chấm công hợp lệ</Text>
        </View>
        <View style={styles.line} />
        <View style={{flexDirection: 'row', margin: 5, top: 10}}>
          <Octicons name="dot-fill" size={20} color="red" style={{top: 5}} />
          <Text style={styles.text}>Chấm công không hợp lệ</Text>
        </View>
        <View style={styles.line} />
        <View style={{flexDirection: 'row', top: 10, margin: 5}}>
          <Octicons name="dot-fill" size={20} color="yellow" style={{top: 5}} />
          <Text style={styles.text}>Chờ xác nhận</Text>
        </View>
        <View style={styles.line} />
        <View style={{flexDirection: 'row', top: 10, margin: 5}}>
          <Octicons
            name="dot-fill"
            size={20}
            color="#016243"
            style={{top: 5}}
          />
          <Text style={styles.text}>Hoàn thành</Text>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default WorkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendar: {
    fontFamily: 'Chakra-Petch',
  },
  text: {
    fontFamily: 'Chakra-Petch',
    fontSize: 17,
    color: 'black',
    marginLeft: 10,
  },
  line: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    paddingHorizontal: 200,
    top: 10,
  },
});
