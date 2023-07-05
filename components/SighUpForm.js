import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { validateInput } from "../utils/actions/formActions";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";
import { reducer } from "../utils/reducers/formReducer";
import { signUp } from "../utils/actions/authActions";
import { Alert } from "react-native";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false, // To check if the whole form is valid
};

const SighUpForm = (props) => {
  const [error, setError] = useState();
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

  const authHandler = async () => {
    try {
      await signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

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
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </Fragment>
  );
};

export default SighUpForm;
