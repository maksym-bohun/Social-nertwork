import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "./MainNavigation";
import AuthStack from "./AuthStack";
import { fetchCurrentUser, setUser } from "../store/currentUserReducer";
import { fetchUsers, setUsers } from "../store/usersReducer";
import { navigationRef } from "./rootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPosts } from "../store/postsReducer";

export const Router = () => {
  const dispatch = useDispatch();

  const userIsLoggedIn = useSelector(
    (state) => state.currentUserReducer.loggedIn
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    if (AsyncStorage.getItem("token") && AsyncStorage.getItem("token") !== "") {
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {userIsLoggedIn ? <MainNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
