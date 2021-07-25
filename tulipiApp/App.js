import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import Main from "./Navigators/Main";

// Screens
import SharedHeader from "./Shared/SharedHeader";
import ProductContainer from "./Screens/Products/ProductContainer";

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}
