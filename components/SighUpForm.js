import React, { Fragment, useCallback, useReducer } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";

const initialState = {
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false, // To check if the whole form is valid
};

const SighUpForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );

  return (
    <Fragment>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["firstName"]}
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["lastName"]}
      />
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
        title="Sign up"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </Fragment>
  );
};

export default SighUpForm;
