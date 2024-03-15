import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./components/Chats/Chats";
import NewPost from "./components/NewPost/NewPost";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "./components/Chats/Chat";
import Comment from "./components/Home/Post/AddComment";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerPage() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerIcon: () => (
          <Image
            style={{ height: 28, width: 28, marginTop: 10 }}
            source={require("./assets/home.png")}
          />
        ),
      }}
    >
      <Drawer.Screen component={Home} name="Home" />
    </Drawer.Navigator>
  );
}

function Landing() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 90 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home1"
        component={DrawerPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 28, width: 28, marginTop: 10 }}
              source={
                focused
                  ? require("./assets/home_filled.png")
                  : require("./assets/home.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="New post"
        component={NewPost}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 36, width: 36 }}
              source={
                focused
                  ? require("./assets/plus_filled.png")
                  : require("./assets/plus.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ height: 28, width: 28, marginTop: 10 }}
              source={
                focused
                  ? require("./assets/chat_filled.png")
                  : require("./assets/chat.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={({ route }) => {
            console.log("ROUTE ", route.params.userImage);
            return {
              title: route.params.username,
              headerBackTitleVisible: false,
              headerRight: () => (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: route.params.userImage,
                  }}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="Add comment"
          component={Comment}
          options={{ animation: "slide_from_bottom" }}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});
