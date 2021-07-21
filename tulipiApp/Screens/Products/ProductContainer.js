import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";

import SharedHeader from "../../Shared/SharedHeader";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setSearch("");

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setSearch();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
    setSearch(text);
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View>
      {focus === true ? (
        <View>
          <SharedHeader />
          <SearchBar
            placeholder="Search"
            platform="ios"
            onFocus={openList}
            onCancel={onBlur}
            onChangeText={(text) => searchProduct(text)}
            value={search}
          />
          <SearchedProducts productsFiltered={productsFiltered} />
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <FlatList
              ListHeaderComponent={
                <View>
                  <SharedHeader />
                  <SearchBar
                    placeholder="Search"
                    platform="ios"
                    onFocus={openList}
                    onCancel={onBlur}
                    onChangeText={(text) => searchProduct(text)}
                    value={search}
                  />
                  <Banner />
                </View>
              }
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.name}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gainsboro",
  },
});

export default ProductContainer;
