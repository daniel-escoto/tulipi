import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Text } from "react-native-elements";

const SharedHeader = () => {
  return (
    <Header
      statusBarProps={{ barStyle: "dark-content" }}
      centerComponent={
        <Text h3 style={styles.header}>
          Tulipi
        </Text>
      }
      containerStyle={{
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
      }}
    />

    // <View style={styles.header}>
    //   <View>
    //     <Text style={styles.headerText}>GameZone</Text>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#eb5814",
  },
});

export default SharedHeader;
