import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Screens
import SharedHeader from "./Shared/SharedHeader";
import ProductContainer from "./Screens/Products/ProductContainer";

export default function App() {
  return (
    <SafeAreaView>
      <ProductContainer />
    </SafeAreaView>
  );
}
