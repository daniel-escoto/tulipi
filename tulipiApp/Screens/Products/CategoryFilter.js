import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text, Chip } from "react-native-elements";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "white" }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity key={1}>
          <Chip
            type={props.active === -1 ? "solid" : "outline"}
            title="All"
            onPress={() => {
              props.CategoryFilter("all"), props.setActive(-1);
            }}
          />
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity key={item._id}>
            <Chip
              type={
                props.active === props.categories.indexOf(item)
                  ? "solid"
                  : "outline"
              }
              title={item.name}
              onPress={() => {
                props.CategoryFilter(item._id),
                  props.setActive(props.categories.indexOf(item));
              }}
            />
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryFilter;
