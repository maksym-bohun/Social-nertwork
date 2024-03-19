import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "./MainNavigation";
import AuthStack from "./AuthStack";
import { setUser } from "../store/currentUserReducer";
import { setUsers } from "../store/usersReducer";

export const Router = ({ userIsStoredOnDevice, currentUser, allUsers }) => {
  const dispatch = useDispatch();

  const userIsLoggedIn = useSelector(
    (state) => state.currentUserReducer.loggedIn
  );

  useEffect(() => {
    console.log("CURRENT USER ", currentUser);
    if (currentUser) {
      console.log("EXISTS");
      dispatch(setUser(currentUser));
    }
    if (allUsers && allUsers.length > 0) {
      dispatch(setUsers(allUsers));
    }
  }, [currentUser, allUsers]);

  useEffect(() => {
    console.log("USER IS LOGGED IN", userIsLoggedIn);
  }, [userIsLoggedIn]);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <MainNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
