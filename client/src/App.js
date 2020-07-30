import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Main from "./components/layout/Main/Main";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import AddItem from "./components/addPage/AddItem/AddItem";
import Alert from "./components/reusables/Alert";

//redux
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content-container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/items" component={AddItem} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
