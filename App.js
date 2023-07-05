import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";
import { store } from "./store/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts/Merriweather-Black.ttf"),
          blackItalic: require("./assets/fonts/Merriweather-BlackItalic.ttf"),
          bold: require("./assets/fonts/Merriweather-Bold.ttf"),
          boldItalic: require("./assets/fonts/Merriweather-BoldItalic.ttf"),
          italic: require("./assets/fonts/Merriweather-Italic.ttf"),
          light: require("./assets/fonts/Merriweather-Light.ttf"),
          lightItalic: require("./assets/fonts/Merriweather-LightItalic.ttf"),
          regular: require("./assets/fonts/Merriweather-Regular.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    };
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    color: "black",
    fontSize: 18,
    fontFamily: "regular",
  },
});
