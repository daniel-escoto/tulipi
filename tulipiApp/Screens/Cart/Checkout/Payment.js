import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";

const { width } = Dimensions.get("window");

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose your payment method</Text>
      </View>
      <View style={styles.paymentMethodList}>
        {methods.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => setSelected(item.value)}
            >
              <ListItem bottomDivider>
                <ListItem.Content style={styles.body}>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  {selected === item.value ? (
                    <Icon
                      name="check"
                      style={{ marginTop: 4 }}
                      size={16}
                      color={"#eb5814"}
                    />
                  ) : null}
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        })}
      </View>
      {selected === 3 ? (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose your card type</Text>
          </View>
          <View style={styles.pickerContainer}>
            <View>
              <RNPickerSelect
                placeholder={{ label: "Select a card type", value: null }}
                onValueChange={(e) => setCard(e)}
                items={paymentCards.map((c) => {
                  return { key: c.name, label: c.name, value: c.name };
                })}
              />
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.button}>
        <Button
          title="Confirm"
          onPress={() => props.navigation.navigate("Confirm", { order })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderColor: "thistle",
    borderBottomWidth: 1,
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerText: {
    textAlign: "center",
    color: "#686868",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethodList: {
    marginBottom: 10,
  },
  pickerContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    alignSelf: "center",
    paddingTop: 20,
  },
});

export default Payment;
