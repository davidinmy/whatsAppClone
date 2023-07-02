import React, { Fragment } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const SighInForm = (props) => {
  return (
    <>
      <Input label="Email" icon="mail" iconPack={Feather} />
      <Input label="Password" icon="lock" iconPack={Feather} />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SighInForm;
