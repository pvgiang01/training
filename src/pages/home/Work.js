import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useAppSelector} from '../../redux/store';
import localConfigCalendar from '../../component/LocalConfig';
const WorkScreen = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
  const [selectedDate, setSelectedDate] = useState();
  localConfigCalendar;

  return (
    <View style={styles.container}>
      <Calendar
        style={{height: 340}}
        onDayPress={day => setSelectedDate(day.dateString)}
        theme={{
          textDayFontFamily: 'Chakra-Petch',
          textMonthFontFamily: 'ChakraPetch-Light',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 15,
        }}
        markedDates={{
          [selectedDate]: {
            selectedDate: true,
            disableTouchEvent: true,
            selectedColor: 'red',
          },
        }}
      />
      <View style={{margin: 20, flex: 1}}>
        <Text
          style={{fontFamily: 'Chakra-Petch', fontSize: 20, color: 'black'}}>
          Chú thích:
        </Text>
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
});
