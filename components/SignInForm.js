import React, { useReducer, useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { validateInput } from "../utils/actions/formActions";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";
import { signIn } from "../utils/actions/authActions";

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
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

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
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SighInForm;
