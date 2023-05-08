import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import {useAppSelector} from '../../redux/store';

const WorkScreen = ({navigation}) => {
  const access_token = useAppSelector(state => state.auth.accessToken);
 const [selectedDate, setSelectedDate] = useState();
 LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    monthNamesShort: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    dayNames: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    today: "Hôm nay"
  };
  LocaleConfig.defaultLocale = 'vi';
  const handleDay = (day) =>{
    setSelectedDate(day.dateString)
    // navigation.navigate('DetailNotification')
  }
  return (
   <View style={styles.container}>
   <Calendar style={{height:340}}
      onDayPress={handleDay}
      theme={{textDayFontFamily:'Chakra-Petch',textMonthFontFamily:'ChakraPetch-Light',textDayFontSize:20,textMonthFontSize:20,textDayHeaderFontSize:15}}
      markedDates={{
        [selectedDate]: {selectedDate: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
    <View style={{margin:20,flex:1}}>
        <Text style={{fontFamily:'Chakra-Petch',fontSize:20,color:'black'}}>Chú thích:</Text>
    </View>
   </View>
  );
};

export default WorkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  calendar:{
    fontFamily:'Chakra-Petch'
  }
});
