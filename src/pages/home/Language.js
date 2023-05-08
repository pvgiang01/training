import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import i18n from '../../i18n/i18n';
const LanguageScreen = (props) => {
  const [locale,setLocale] = useState(i18n.locale)
  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
    i18n.locale = newLocale;
    props.navigation.navigate('SettingScreen')
  };
  return(
   <>
   <View style={styles.container}>
    <TouchableOpacity onPress={()=> handleLanguageChange('vi')}>
        <Text style={styles.text}>Tiếng việt</Text>
    </TouchableOpacity>
    <View style={styles.line}/>
    <TouchableOpacity onPress={()=> handleLanguageChange('en')}>
        <Text style={styles.text}>EngLish</Text>
    </TouchableOpacity>
    <View style={styles.line}/>
   </View>
  </>
  )
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  text:{
    fontFamily:'Chakra-Petch',
    fontSize:21,
    margin:10,
    left:20,
    color:'black'
  },
  line:{
    height:1,
    width:390,
    marginLeft:30,
    backgroundColor:'gray'
  }
});
