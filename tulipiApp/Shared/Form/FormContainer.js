import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Text style={styles.title}>{props.title}</Text>
    //   {props.children}
    // </ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    // width: width,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
