import { path } from "./apiRoutes";

const getMe = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`${path}users/me`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { token, currentUser: data };
};

export default getMe;
