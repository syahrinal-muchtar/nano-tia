import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import ListPost from "./components/ListPost";
import DetailPost from "./components/DetailPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <ListPost />
            </Provider>
          }
        ></Route>
        <Route
          path="/:slug"
          element={
            <Provider store={store}>
              <DetailPost />
            </Provider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
