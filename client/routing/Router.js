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
    if (currentUser) {
      dispatch(setUser(currentUser));
    }
    if (allUsers && allUsers.length > 0) {
      dispatch(setUsers(allUsers));
    }
  }, [currentUser, allUsers]);

  useEffect(() => {}, [userIsLoggedIn]);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? <MainNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
