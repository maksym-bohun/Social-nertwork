import { fetchCurrentUser } from "../store/currentUserReducer";
import { fetchUsers } from "../store/usersReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { path } from "./apiRoutes";

export const unfriend = async (user, setUserIsFriend, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${path}users/unfriend/${user._id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status === "success") {
    dispatch(fetchCurrentUser());
    dispatch(fetchUsers());
    setUserIsFriend(false);
  }
};
