import {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';



export const Input = props => {
  const {style, error, ...rest} = props;





  return (
    <View style={style}>
      <View style={[styles.container]}>
        <TextInput style={styles.input} {...rest} />
      </View>
      {error && <Text style={styles.error}> ~ {error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,

    borderColor: 'darkgray',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    lineHeight: 16,
    flex: 1,
  },
  error: {
    marginTop: 4,
    textTransform: 'lowercase',
    color: 'red',
  },
});
