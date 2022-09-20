import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";

import UserInfo1 from "./UserInfo1";
export const userContext = createContext();

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])


  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <div className="main-page-container">
          <Route exact path="/">
            <userContext.Provider value={currentUser}>
                <h2>Car Show Participant App</h2>
                <UserInfo1 />
            </userContext.Provider>
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </div>
      </Switch>
    </Router>
  );
};

export default hot(App);
