import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUsers } from "../store/usersReducer";
import { fetchCurrentUser } from "../store/currentUserReducer";
import { path } from "./apiRoutes";

export const makeFriendsHandler = async (user, setUserIsFriend, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${path}users/makeFriend/${user._id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status === "success") {
    dispatch(fetchCurrentUser());
    dispatch(fetchUsers());
    setUserIsFriend(true);
  }
};
