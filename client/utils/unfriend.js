import { fetchCurrentUser } from "../store/currentUserReducer";
import { fetchUsers } from "../store/usersReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unfriend = async (user, setUserIsFriend, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(
    `http://127.0.0.1:8000/api/v1/users/unfriend/${user._id}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log("DATA STATUS ", data.status);
  if (data.status === "success") {
    dispatch(fetchCurrentUser());
    dispatch(fetchUsers());
    setUserIsFriend(false);
  }
};
