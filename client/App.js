import { Provider } from "react-redux";
import store from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Router } from "./routing/Router";

const getMe = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { token, currentUser: data };
};

const getAllUsers = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/users", {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "success") return data.users;
  return null;
};

export default function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { token, currentUser } = await getMe();
      const users = await getAllUsers();
      setToken(token);
      setCurrentUser(currentUser.data);
      setAllUsers(users);
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <Router
        userIsStoredOnDevice={token !== ""}
        currentUser={currentUser}
        allUsers={allUsers}
      />
    </Provider>
  );
}
