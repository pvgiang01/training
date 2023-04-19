import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  
  export const Pagination = (props) => {
    const { totalRecord, current = 1, onChange, pageSize = 10 } = props;
  
    const getTotalPage = () => {
      return Math.ceil(totalRecord / pageSize);
    };
  
    return (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={getTotalPage()}
          horizontal
          data={[...Array(getTotalPage())]}
          renderItem={({ item, index }) => {
            const currentPage = index + 1 == current;
            return (
              <TouchableOpacity
                onPress={() => {
                  onChange(index + 1);
                }}
                style={[styles.item, currentPage && { backgroundColor: "green" }]}
                key={index}
              >
                <Text style={[currentPage && { color: "white" }]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            );
          }}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </>
    );
  };
  const styles = StyleSheet.create({
    item: {
      width: 50,
      height: 35,
      borderWidth: 1,
      borderColor: "green",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    separator: {
      marginRight: 10,
    },
  });