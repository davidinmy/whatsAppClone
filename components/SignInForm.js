import React, { useReducer, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { validateInput } from "../utils/actions/formActions";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
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
      dispatchFormState({ inputId, validationResult: result });
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
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SighInForm;
