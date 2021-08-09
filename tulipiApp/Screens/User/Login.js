import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

import SharedHeader from "../../Shared/SharedHeader";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const user = { email, password };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    }
  };

  return (
    <View>
      <SharedHeader />
      <FormContainer title={"Login"}>
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
        <View style={[{ marginTop: 60 }, styles.buttonGroup]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate("Register")}
          />
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;