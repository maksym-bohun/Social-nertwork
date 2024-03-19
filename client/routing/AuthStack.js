import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{ title: "Sign up", headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
