import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Text, ListItem, Avatar } from "react-native-elements";
import SharedHeader from "../../Shared/SharedHeader";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  let total = 0;

  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  return (
    <View style={styles.container}>
      <SharedHeader />
      {props.cartItems.length ? (
        <View>
          <Text h2={true} h2Style={{ alignSelf: "center" }}>
            Cart
          </Text>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data, rowMap) => (
              <View style={styles.rowFront}>
                <CartItem item={data} />
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />

          <View style={styles.bottomContainer}>
            <Text style={styles.price}>${total.toFixed(2)}</Text>
            <View style={styles.buttons}>
              <Button title="Clear" onPress={() => props.clearCart()} />
              <Button
                title="Checkout"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started.</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
    height: "100%",
  },
  emptyContainer: {
    height: height / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
    padding: 10,
    backgroundColor: "white",
    elevation: 20,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
