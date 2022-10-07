import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div className="authenticated-list-items">
      <Link to="/user-sessions/new">
        Sign In
      </Link>
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </div>
  ]

  const authenticatedListItems = [
      <SignOutButton />
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h3>Sponsors:</h3>
        <div className="top-bar-sponsors">
          <a href="https://www.rilocalwoodworks.com" target="_blank">
            <img className="sponsor-logo" id="rilw-logo" src="https://i.imgur.com/2j5LqFQ.jpg" alt="RI Local Woodworks Logo" />
          </a>
          <a href="https://www.koszelalumber.com" target="_blank">
            <img className="sponsor-logo" id="koszela-lumber-logo" src="https://i.imgur.com/is8n6BZ.png" alt="RI Local Woodworks Logo" />
          </a>
        </div>
      </div>
      <p>{user ? authenticatedListItems : unauthenticatedListItems}</p>
    </div>
  )
}

export default TopBar
