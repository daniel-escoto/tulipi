import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SharedHeader from "../../Shared/SharedHeader";

const Checkout = (props) => {
  return (
    <View style={styles.container}>
      <SharedHeader />
      <Text>This is the checkout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
    height: "100%",
  },
});

export default Checkout;
