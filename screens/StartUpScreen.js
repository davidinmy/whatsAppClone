import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import { setDidTryAutoLogin } from "../store/authSlice";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const storeAuthInfo = await AsyncStorage.getItem("userData");
      if (!storeAuthInfo) {
        console.log("no storage found");
        dispatch(setDidTryAutoLogin());
        return;
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default StartUpScreen;
