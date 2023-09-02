import React, { useCallback, useReducer, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";

import { FontAwesome, Feather } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import colors from "../constants/colors";
import { updateSignedInUserData } from "../utils/actions/authActions";

const SettingsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const initialState = {
    inputValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = async () => {
    const updatedValues = formState.inputValues;
    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Save"
          onPress={saveHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
