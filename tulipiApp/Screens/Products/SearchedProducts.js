import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { SearchBar } from "react-native-elements";

const SearchedProducts = (props) => {
  const { productsFiltered } = props;

  return (
    <View>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id.$oid}
            bottomDivider
          >
            <Avatar
              source={{
                uri: item.image
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <View>
          <Text style={styles.text}>
            No products match the selected criteria
          </Text>
        </View>
      )}

      {/* <FlatList
        ListHeaderComponent={Header}
        data={productsFiltered}
        renderItem={({ item }) => (
          <ListItem key={item._id.$oid} bottomDivider>
            <Avatar
              source={{
                uri: item.image
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item._id.$oid}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: "grey",
  },
  text: {
    alignSelf: "center",
    color: "grey",
  },
});

export default SearchedProducts;
