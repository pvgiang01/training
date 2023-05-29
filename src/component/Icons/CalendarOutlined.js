import _ from 'lodash';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WINDOW_WIDTH} from '../constants/const';
import DownOutlined from './Icons/DownOutlined';
import Modal from './Modal';

const Dropdown = props => {
  const {
    data = [],
    value = '',
    placeholder,
    onChange,
    schema = {
      label: 'label',
      value: 'value',
    },
    showLabel = true,
    ...modalProps
  } = props;
  console.log('value', value);
  let getSelectedItem = {};
  if (!_.isEmpty(data) && value) {
    data?.find(
      item =>
        (getSelectedItem = value
          ?.toString()
          .includes(_.get(item, [schema.value]))),
    );
  }

  const getLabel = () => {
    if (getSelectedItem) {
      let label = _.get(getSelectedItem, [schema.label]);
      return label;
    } else return placeholder;
  };
  console.log('data11111', data);
  const newData = [{
    // id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  }]
  // console.log('schema', schema);
  return (
    <>
      {showLabel && (
        <View style={styles.viewHintContent}>
          <Text style={styles.hint}>{getLabel()}</Text>
          <DownOutlined />
        </View>
      )}
      <Modal {...modalProps}>
        <View style={styles.modalContainer}>
          <FlatList
            data={data}
            keyExtractor={item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  onPress={() => {
                    onChange(item);
                  }}>
                  <Text style={styles.label}>
                    {item.name || ""}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{borderBottomWidth: 1, borderColor: '#d9d9d9'}} />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  viewHintContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hint: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'ChakraPetch-Light',
    flex: 1,
  },
  modalContainer: {
    width: WINDOW_WIDTH * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#3F3F3F',
  },
});
