import React from 'react';
import {Pressable, StyleSheet, Text, View,TextInput} from 'react-native';

const ListInput = props => {
  const {
    title,
    textInput,
    disabled,
    onPress,
    rightComponent,
    rightStyle,
    bottomComponent,
    bottomDivider = true,
  } = props;
  return (
    <>
      <Pressable disabled={disabled} onPress={onPress}>
        <View style={styles.container}>
          <Text style={{}}>
            <Text style={styles.title}>
              {title}: {'  '}
            </Text>
          </Text>
          <View style={[rightStyle ? rightStyle : styles.subtitle]}>
            {rightComponent}
          </View>
        </View>
      </Pressable>
      {bottomComponent}
      {bottomDivider && <View style={{borderBottomWidth: 1,borderColor: '#d9d9d9'}}/>}
    </>
  );
};

export default ListInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:10,
    marginRight:10
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Chakra-Petch',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'ChakraPetch-Light',
  },
  rightStyle: {
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'flex-end',
  },
});
