import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, ScrollView, Button } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

import SharedHeader from "../../Shared/SharedHeader";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <SharedHeader />
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text h1={true} h1Style={styles.contentHeader}>
            {item.name}
          </Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Button
          style={styles.button}
          title="Add"
          onPress={() => {
            props.addItemToCart(item);
          }}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
  },
  price: {
    fontSize: 24,
    color: "red",
  },
  button: {},
});

export default connect(null, mapDispatchToProps)(SingleProduct);
