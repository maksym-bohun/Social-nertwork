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

export default getMe;
