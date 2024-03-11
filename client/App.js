import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./components/Chats/Chats";
import NewPost from "./components/NewPost/NewPost";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Landing() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New post" component={NewPost} />
      <Tab.Screen name="Chats" component={Chats} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
