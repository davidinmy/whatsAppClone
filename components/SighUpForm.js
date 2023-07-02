import React, { Fragment } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

const SighUpForm = (props) => {
  return (
    <Fragment>
      <Input label="First name" icon="user-o" iconPack={FontAwesome} />
      <Input label="Last name" icon="user-o" iconPack={FontAwesome} />
      <Input label="Email" icon="mail" iconPack={Feather} />
      <Input label="Password" icon="lock" iconPack={Feather} />

      <SubmitButton
        title="Sign up"
        onPress={() => console.log("button pressed")}
        style={{ marginTop: 20 }}
      />
    </Fragment>
  );
};

export default SighUpForm;
