import { Provider } from "react-redux";
import { store } from "./config";
import Router from "./config/Routes/Router";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
