import React from "react";
import { StyleSheet, Text } from "react-native";
import { Badge } from "react-native-elements";

import { connect } from "react-redux";
import cartItems from "../Redux/Reducers/cartItem";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge
          containerStyle={styles.badge}
          value={props.cartItems.length}
          status="error"
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -15,
  },
});

export default connect(mapStateToProps)(CartIcon);
