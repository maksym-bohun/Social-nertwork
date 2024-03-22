import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "./MainNavigation";
import AuthStack from "./AuthStack";
import { fetchCurrentUser, setUser } from "../store/currentUserReducer";
import { setUsers } from "../store/usersReducer";
import { navigationRef } from "./rootNavigation";

export const Router = () => {
  const dispatch = useDispatch();

  const userIsLoggedIn = useSelector(
    (state) => state.currentUserReducer.loggedIn
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {userIsLoggedIn ? <MainNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};
