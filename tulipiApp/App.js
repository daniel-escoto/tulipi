import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigators
import Main from "./Navigators/Main";

// Screens
import SharedHeader from "./Shared/SharedHeader";
import ProductContainer from "./Screens/Products/ProductContainer";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
