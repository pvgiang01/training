import React from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ListItem = props => {
  const {
    title,
    subtitle,
    disabled,
    onPress,
    rightComponent,
    rightStyle,
    textInput,
    bottomComponent,
    bottomDivider = true,
  } = props;
  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View style={styles.container}>
          <Text style={{}}>
            <Text style={styles.title}>
              {title}: {'  '}
            </Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </Text>
          <View style={[rightStyle ? rightStyle : styles.rightStyle]}>
            {rightComponent}
          </View>
        </View>
      </TouchableOpacity>
      {bottomComponent}
      {bottomDivider && <View style={{borderBottomWidth: 1,borderColor: '#d9d9d9'}}/>}
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
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
