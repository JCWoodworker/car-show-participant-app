import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import { Link } from "react-router-dom"

import "../assets/scss/main.scss"
import getCurrentUser from "../services/getCurrentUser"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"

import TopBar from "./TopBar"
import UserHome from "./userComponents/UserHome"
import AdminHome from "./adminComponents/AdminHome"

export const userContext = createContext()

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
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
  
  let userHomeDisplay = null
  if (currentUser) {
    currentUser.isAdmin ? userHomeDisplay = <AdminHome /> : userHomeDisplay = <UserHome />
  } else {
    userHomeDisplay = <p>Please <Link to="/user-sessions/new">SIGN IN</Link> or <Link to="/users/new">REGISTER</Link></p>
  }

  return (
    <Router>
      <TopBar user={currentUser} />
        <div className="main-title">
          <h2>2023 Michael P Stefanik Foundation Car Show</h2>
        </div>
      <Switch>
        <div className="main-page-container">
          <Route exact path="/">
            <userContext.Provider value={currentUser}>
              {userHomeDisplay}
            </userContext.Provider>
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </div>
      </Switch>
      <div>
        <div className="sponsors">
          <a href="https://www.rilocalwoodworks.com" target="_blank">
            <img className="sponsor-logo" id="rilw-logo" src="https://i.imgur.com/2j5LqFQ.jpg" alt="RI Local Woodworks Logo" />
          </a>
          <a href="https://www.koszelalumber.com" target="_blank">
            <img className="sponsor-logo" id="koszela-lumber-logo" src="https://i.imgur.com/is8n6BZ.png" alt="RI Local Woodworks Logo" />
          </a>
        </div>
      </div>
    </Router>
  )
}

export default hot(App)
