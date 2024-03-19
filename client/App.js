import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import MainNavigation from "./MainNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState(null);
  // const currentUser = useSelector((state) => {
  //   state;
  // });

  // console.log("curUser ", currentUser);
  useEffect(() => {
    console.log("tokennnn ", token);
  }, [token]);

  (async () => {
    setToken(await AsyncStorage.getItem("token"));
  })();

  return (
    <Provider store={store}>
      <MainNavigation userIsLoggedIn={token === null ? false : true} />
    </Provider>
  );
}
