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
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "./components/Chats/Chat";
import Comment from "./components/Home/Post/AddComment";
import UserPage from "./components/UserPage/UserPage";
import Account from "./components/Account/Account";
import EditAccount from "./components/Account/EditAccount";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ title, imageSource }) => {
  return (
    <DrawerItem
      label={() => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: imageSource }}
            style={{
              width: 40,
              height: 40,
              marginRight: 10,
              borderRadius: 50,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
        </View>
      )}
    />
  );
};

function DrawerPage() {
  return (
    <Drawer.Navigator initialRouteName="Home draw">
      <Drawer.Screen
        name="Oleksandr Usyk"
        component={Login}
        options={{
          drawerLabel: () => (
            <CustomDrawerItem
              title="Oleksandr Usyk"
              imageSource="https://ca-times.brightspotcdn.com/dims4/default/944d9ad/2147483647/strip/true/crop/3900x2599+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fcb%2Fcb%2F88421cf7552ea4b7ad10c003f537%2F608af726816e448ea3e0f9a9af2c0feb"
            />
          ),
        }}
      />

      <Drawer.Screen
        component={Home}
        name="Home draw"
        options={{
          title: "Home",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("./assets/home.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
          title: "Account",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("./assets/user.png")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function EditAccountScreen() {
  return (
    <Drawer.Navigator initialRouteName="Account">
      <Drawer.Screen
        name="Oleksandr Usyk"
        component={Login}
        options={{
          drawerLabel: () => (
            <CustomDrawerItem
              title="Oleksandr Usyk"
              imageSource="https://ca-times.brightspotcdn.com/dims4/default/944d9ad/2147483647/strip/true/crop/3900x2599+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fcb%2Fcb%2F88421cf7552ea4b7ad10c003f537%2F608af726816e448ea3e0f9a9af2c0feb"
            />
          ),
        }}
      />
      <Drawer.Screen
        component={Home}
        name="Home draw"
        options={{
          title: "Home",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("./assets/home.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          title: "Account",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("./assets/user.png")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Account Stack"
        component={EditAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit account" component={EditAccount} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home page">
      <Stack.Screen
        component={DrawerPage}
        name="Home page"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User page"
        component={UserPage}
        // options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="Add comment" component={Comment} />
    </Stack.Navigator>
  );
}

// function Landing() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { height: 90 },
//         tabBarShowLabel: false,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <Image
//               style={{ height: 28, width: 28, marginTop: 10 }}
//               source={
//                 focused
//                   ? require("./assets/home_filled.png")
//                   : require("./assets/home.png")
//               }
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="New post"
//         component={NewPost}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Image
//               style={{ height: 36, width: 36 }}
//               source={
//                 focused
//                   ? require("./assets/plus_filled.png")
//                   : require("./assets/plus.png")
//               }
//             />
//           ),
//         }}
//       />
//       {/* CHATS */}
//       <Tab.Screen
//         name="Chats"
//         component={Chats}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Image
//               style={{ height: 28, width: 28, marginTop: 10 }}
//               source={
//                 focused
//                   ? require("./assets/chat_filled.png")
//                   : require("./assets/chat.png")
//               }
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

function ChatTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Chats}
        name="Chats"
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Chat}
        name="chat"
        options={({ route }) => ({ title: route.params.username })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 90 },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
          component={ChatTab}
          options={{
            headerShown: false,
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
