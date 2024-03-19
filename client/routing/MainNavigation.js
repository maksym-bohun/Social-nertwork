import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "../components/auth/Login";
import Home from "../components/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "../components/Chats/Chats";
import NewPost from "../components/NewPost/NewPost";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "../components/Chats/Chat";
import Comment from "../components/Home/Post/AddComment";
import UserPage from "../components/UserPage/UserPage";
import Account from "../components/Account/Account";
import EditAccount from "../components/Account/EditAccount";
import FriendsList from "../components/UserPage/FriendsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "../store/currentUserReducer";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  return (
    <Drawer.Navigator initialRouteName="Home draw">
      <Drawer.Screen
        name="User's name"
        component={Login}
        options={({ route, navigation }) => {
          console.log("ROute", route);
          return {
            drawerLabel: () => (
              <CustomDrawerItem
                title={currentUser?.name || ""}
                imageSource={currentUser?.avatar || ""}
              />
            ),
          };
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
              source={require("../assets/home.png")}
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
              source={require("../assets/user.png")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function EditAccountScreen() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer.user);

  return (
    <Drawer.Navigator initialRouteName="Account">
      <Drawer.Screen
        name="Oleksandr Usyk"
        component={Login}
        options={{
          drawerLabel: () => (
            <CustomDrawerItem
              title={currentUser?.name || ""}
              imageSource={currentUser?.avatar || ""}
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
              source={require("../assets/home.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          title: "Account",
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await AsyncStorage.setItem("token", "");
                dispatch(logout());
              }}
            >
              <MaterialIcons name="logout" size={20} color="black" />
              <Text>Log out</Text>
            </TouchableOpacity>
          ),
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../assets/user.png")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen
        name="Account Stack"
        component={EditAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit account" component={EditAccount} />
    </Stack.Navigator>
  );
}

function HomeScreen({ currentUser }) {
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
        options={({ route }) => ({
          headerBackTitle: "Back",
          title: route.params.user.name,
        })}
      />
      <Stack.Screen name="Users list" component={FriendsList} />
      <Stack.Screen name="Add comment" component={Comment} />
      <Stack.Screen
        name="Friends List"
        component={FriendsList}
        options={({ route }) => ({
          headerBackTitle: "Back",
          title: "Friends",
        })}
      />
    </Stack.Navigator>
  );
}

function ChatTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Chats}
        name="Chats Screen"
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Chat}
        name="chat"
        options={({ route }) => ({
          title: route.params.username,
          headerBackTitle: "Back",
        })}
      />
    </Stack.Navigator>
  );
}

function TabNavigation({ currentUser }) {
  return (
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
                  ? require("../assets/home_filled.png")
                  : require("../assets/home.png")
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
                  ? require("../assets/plus_filled.png")
                  : require("../assets/plus.png")
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
                  ? require("../assets/chat_filled.png")
                  : require("../assets/chat.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={TabNavigation}
        name="Landing"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

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
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#afd7fd",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    gap: 5,
    marginRight: 10,
  },
});