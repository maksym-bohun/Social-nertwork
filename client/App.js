import { Provider } from "react-redux";
import store from "./store/store";
import { Router } from "./routing/Router";
export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
