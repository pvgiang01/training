import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {WINDOW_WIDTH} from '../constants/const';
import Modal from './Modal';

const DatePicker = props => {
  const {value, visible, onClose, onDayChange} = props;

  return (
    <Modal visible={visible} onBackdropPress={onClose} onRequestClose={onClose}>
      <Calendar
        style={styles.calendar}
        hideExtraDays
        theme={{
          textDayFontFamily: 'Chakra-Petch',
          textMonthFontFamily: 'ChakraPetch-Light',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 15,
        }}
        onDayPress={day => {
          onDayChange(day.dateString);
        }}
        markedDates={{
          [value]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
        current={value}
      />
    </Modal>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  calendar: {
    width: WINDOW_WIDTH * 0.9,
    borderRadius: 8,
    padding: 10,
  },
});
