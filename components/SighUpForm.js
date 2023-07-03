import React, { Fragment } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { validate } from "validate.js";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const SighUpForm = (props) => {
  const inputChangeHandler = (inputId, inputValue) => {
    if (inputId === "firstName" || inputId === "lastName") {
      const constraints = {
        presence: { allowEmpty: false },
      };

      if (inputValue !== "") {
        constraints.format = {
          pattern: "[a-z]+",
          flags: "i", // case sensitive
          message: "can only contain letters",
        };
      }

      console.log(
        validate({ [inputId]: inputValue }, { [inputId]: constraints })
      );
    } else if (inputId === "email") {
    } else if (inputId === "password") {
    }
  };

  return (
    <Fragment>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />

      <SubmitButton
        title="Sign up"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
      />
    </Fragment>
  );
};

export default SighUpForm;
