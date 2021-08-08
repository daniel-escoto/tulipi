import React, { useState, useCallback } from "react";
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

import { useFocusEffect } from "@react-navigation/native";
import SharedHeader from "../../Shared/SharedHeader";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setSearch("");
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("API call error");
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("API call error");
        });

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
    }, [])
  );

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
            setProductsCtg(products.filter((i) => i.category._id === ctg)),
            setActive(true),
          ];
    }
  };

  return (
    <>
      {loading == true ? (
        <View style={styles.center}>
          <SharedHeader />
          <SearchBar placeholder="Search" platform="ios" disabled={true} />
          <View style={{ marginTop: 100 }}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      ) : (
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
              <SearchedProducts
                navigation={props.navigation}
                productsFiltered={productsFiltered}
              />
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
                    <ProductList
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                    />
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
      )}
    </>
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
