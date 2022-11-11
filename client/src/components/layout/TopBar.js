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
        
      </div>
      <p>{user ? authenticatedListItems : unauthenticatedListItems}</p>
    </div>
  )
}

export default TopBar
