import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";

import SharedHeader from "../../Shared/SharedHeader";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const { height } = Dimensions.get("window");
const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setSearch("");
    setCategories(productCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setSearch();
      setCategories([]);
      setProductsCtg([]);
      setActive();
      setInitialState();
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

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(products.filter((i) => i.category.$oid === ctg)),
            setActive(true),
          ];
    }
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
            autoFocus={true}
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
                  <View>
                    <CategoryFilter
                      categories={categories}
                      CategoryFilter={changeCtg}
                      productsCtg={productsCtg}
                      active={active}
                      setActive={setActive}
                    />
                  </View>
                </View>
              }
              data={productsCtg}
              renderItem={({ item }) => (
                <ProductList key={item._id.$oid} item={item} />
              )}
              keyExtractor={(item) => item.name}
              numColumns={2}
              ListEmptyComponent={
                <View style={[styles.center, { paddingTop: 40 }]}>
                  <Text>No products found</Text>
                </View>
              }
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
    height: "100%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
