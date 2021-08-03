import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import cartItems from "../../Redux/Reducers/cartItem";

const { height, width } = Dimensions.get("window");

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <ListItem key={data._id.$oid} bottomDivider>
      <Avatar
        source={{
          uri: data.image
            ? data.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <ListItem.Content style={styles.body}>
        <ListItem.Title>{data.name}</ListItem.Title>
        <ListItem.Title>${data.price}</ListItem.Title>
      </ListItem.Content>
    </ListItem>

    // <View>
    //   <Text>{JSON.stringify(data)}</Text>
    // </View>
  );
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

  price: {
    fontSize: 24,
    color: "red",
  },
});

export default CartItem;
