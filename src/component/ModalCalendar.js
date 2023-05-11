import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
const ModalCalendar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [fromDate, setFormDate] = useState('');

    const handleFromDayPress = day => {
        setShowCalendar(false);
        setFormDate(day.dateString);
      };
  return (
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
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
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
});
