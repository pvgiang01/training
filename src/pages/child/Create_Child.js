import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const CreateChild = ({navigation}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [input,setInput] = useState()
 
  return (
    <View  style={styles.container}>
   <ScrollView>
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Nhân sự:</Text>
        <Text style={styles.textItem}>
          VH000784-Bùi Tiến Dũng
        </Text>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Từ ngày:</Text>
        <Text style={styles.textItem}>
          09/05/2001
        </Text>
        <FontAwesome name='calendar' color='orange' size={20} style={{top:5,marginLeft:180}}/>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Đến ngày:</Text>
        <Text style={styles.textItem}>
          09/05/2001
        </Text>
        <FontAwesome name='calendar' color='orange' size={20} style={{top:5,marginLeft:170}}/>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Tên con:</Text>
        <Text style={styles.textItem}>
        </Text>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row'}}>
        <Text style={styles.text}>Ngày sinh của con:</Text>
        <Text style={styles.textItem}>
          09/05/2001
        </Text>
        <FontAwesome name='calendar' color='orange' size={20} style={{top:5,marginLeft:90}}/>
      </View>
      <View style={styles.line} />
     
      <View style={{margin: 10, flexDirection: 'row'}}>
      <Text style={styles.text}>Lựa chọn chế độ:</Text>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10, flexDirection: 'row'}}>
      <Text style={styles.text}>Đính kèm hình ảnh giấy khai sinh:</Text>
      </View>
      <View style={styles.line} />
      <View style={{margin: 10}}>
      <Text style={styles.text}>Lý do:</Text>
      <TextInput style={styles.textInput} multiline={true}
      numberOfLines={4} onChangeText={(text) =>setInput(text)}/>
      </View>
   </ScrollView>
   <View style={{flexDirection:'row',marginLeft:5}}>
    <TouchableOpacity style={styles.btnSave}>
      <Text style={{color:'white',fontSize:20}}>Lưu</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btSent}>
      <Text style={{color:'white',fontSize:20}}>Gửi</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btnCance}>
      <Text style={{color:'white',fontSize:20}}>Đóng</Text>
    </TouchableOpacity>
   </View>
   </View>
  );
};

export default CreateChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 1,
    width: 390,
    marginLeft: 10,
    bottom:5
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  textItem:{
    marginLeft: 10,
    marginTop:5,
    fontSize: 17,
    color: 'black',
    fontFamily: 'ChakraPetch-Light'
  },
  textLeave:{
    fontSize:17,
    fontFamily:'Chakra-Petch',
    margin:10,
    marginLeft:90,
    color:'black'
  },
  textInput:{
    borderRadius:5,
    backgroundColor:null,
    borderColor:'gray',
    borderWidth:1,
    paddingLeft:20,
    paddingRight:20,
    minHeight:100,
    fontSize:17,
    textAlignVertical:'top'
  },
  btnSave:{
    backgroundColor:'#016243',
    height:40,
    width:125,
    borderRadius:5,
    margin:5,
    justifyContent:'center',
    alignItems:'center'
  },
  btSent:{
    backgroundColor:'#2eb8b8',
    height:40,
    width:125,
    borderRadius:5,
    margin:5,
    justifyContent:'center',
    alignItems:'center'
  },
  btnCance:{
    backgroundColor:'#595959',
    height:40,
    width:125,
    borderRadius:5,
    margin:5,
    justifyContent:'center',
    alignItems:'center'
  }
});
