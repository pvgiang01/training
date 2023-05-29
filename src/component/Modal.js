import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Modal = props => {
  const {onBackdropPress, children, ...modalOtherProps} = props;

  return (
    <RNModal transparent animationType="fade" {...modalOtherProps}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <>{children}</>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(55, 46, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
