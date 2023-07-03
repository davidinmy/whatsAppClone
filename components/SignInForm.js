import React, { Fragment } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const SighInForm = (props) => {
  const inputChangeHandler = (inputId, inputValue) => {
    console.log(validateInput(inputId, inputValue));
  };

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        autoCapitalize="none"
        keyboardType="email-address"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SighInForm;
