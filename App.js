import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//import "react-native-gesture-handler"
import * as React from "react";
import SignInScreen from "./SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "22834005257-4u2fv8hhnp6lc9naud0vsjbo6oadfcpt.apps.googleusercontent.com",
      redirectUriOptions: "https://women-techies-24.firebaseapp.com/__/auth/handler"
  });

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("local storage: ", userData);
      setUserInfo(userData);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        console.log("User is not Authenticated");
      }
    });

    return () => unsub();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  return userInfo ? (
    <WomenTechies />
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
