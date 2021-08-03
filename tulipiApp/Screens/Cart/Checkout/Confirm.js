import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

const { height } = Dimensions.get("window");

const Confirm = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };

  const confirm = props.route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "#686868" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((orderItem) => {
              return (
                <ListItem key={orderItem.product.name} bottomDivider>
                  <Avatar
                    source={{
                      uri: orderItem.product.image
                        ? orderItem.product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                  <ListItem.Content style={styles.body}>
                    <ListItem.Title>{orderItem.product.name}</ListItem.Title>
                    <ListItem.Title>${orderItem.product.price}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
  },
  headerText: {
    textAlign: "center",
    color: "#686868",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    alignSelf: "center",
    color: "#686868",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 24,
    color: "red",
  },
});
export default connect(null, mapDispatchToProps)(Confirm);
