import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUsers } from "../store/usersReducer";
import { fetchCurrentUser } from "../store/currentUserReducer";

export const makeFriendsHandler = async (user, setUserIsFriend, dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(
    `http://127.0.0.1:8000/api/v1/users/makeFriend/${user._id}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.status === "success") {
    dispatch(fetchCurrentUser());
    dispatch(fetchUsers());
    setUserIsFriend(true);
  }
};
