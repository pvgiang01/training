import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAB_WIDTH = 60;

const FabButton = props => {
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="add" size={30} style={{margin: 10}} color="white" />
    </TouchableOpacity>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    height: FAB_WIDTH,
    width: FAB_WIDTH,
    borderRadius: FAB_WIDTH / 2,
    backgroundColor: '#016243',
    position: 'absolute',
    bottom: 20,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
