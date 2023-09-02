import React, { useCallback, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";

import { FontAwesome, Feather } from "@expo/vector-icons";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    about: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    about: false,
  },
  formIsValid: false,
};

const SettingsScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  return (
    <PageContainer>
      <PageTitle text="Settings" />

      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["firstName"]}
        initialValue={userData.firstName}
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["lastName"]}
        initialValue={userData.lastName}
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
        initialValue={userData.email}
      />
      <Input
        id="about"
        label="About"
        icon="user-o"
        autoCapitalize="none"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidities["about"]}
        initialValue={userData.about}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
