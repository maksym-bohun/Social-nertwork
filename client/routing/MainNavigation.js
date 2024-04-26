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
import Notifications from "../components/Notifications/Notifications";
import PostScreen from "../components/Post/PostScreen";
import FriendsListToShare from "../components/SendPost/FriendsList";
import { setFriends } from "../store/usersReducer";

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
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../assets/bell.png")}
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
        name="User"
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
                dispatch(setFriends([]));
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
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          drawerIcon: () => (
            <Image
              style={{ height: 22, width: 22 }}
              source={require("../assets/bell.png")}
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

function createStackNavigator(aditionalRoutes = [], route) {
  return (
    <Stack.Navigator>
      {aditionalRoutes.map((route) => route)}

      <Stack.Screen
        name="User page"
        component={UserPage}
        options={({ route }) => ({
          headerBackTitle: "Back",
          title: route.params.user.name,
        })}
      />
      <Stack.Screen
        name="Users list"
        component={FriendsList}
        options={({ route }) => ({
          title: "Users",
          headerBackTitle: "Back",
          key: route.params.key,
        })}
      />
      <Stack.Screen name="Add comment" component={Comment} />
      <Stack.Screen
        name="Friends List"
        component={FriendsList}
        options={({ route }) => ({
          title: "Friends",
          headerBackTitle: "Back",
          key: route.params.key, // Установите ключ здесь
        })}
      />
      <Stack.Screen
        component={Chat}
        name="Chat screen"
        options={({ route }) => ({
          title: route.params.user.name,
          headerBackTitle: "Back",
        })}
      />
      <Stack.Screen
        component={PostScreen}
        name="Post"
        options={{
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        component={FriendsListToShare}
        name="Friends List to Share"
        options={{
          title: "Share post",
          headerBackTitle: "Back",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ currentUser, route }) {
  return createStackNavigator(
    [
      <Stack.Screen
        component={DrawerPage}
        name="Home page"
        options={{ headerShown: false }}
        key={Math.random()}
      />,
    ],
    route
  );
}

function ChatTab({ route }) {
  return createStackNavigator(
    [
      <Stack.Screen
        component={Chats}
        name="Chats Screen"
        key={Math.random()}
        // options={{ headerShown: false }}
      />,
    ],
    route
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
