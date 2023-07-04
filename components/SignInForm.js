import React, { useReducer, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { validateInput } from "../utils/actions/formActions";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false, // To check if the whole form is valid
};

const SighInForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

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
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["password"]}
      />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SighInForm;
