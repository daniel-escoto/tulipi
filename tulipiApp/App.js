import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

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
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
}
