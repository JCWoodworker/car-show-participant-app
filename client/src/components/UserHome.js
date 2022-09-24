import React, { useContext } from "react"
import CarIndex from "./CarIndex"
import { userContext } from "./App"

const UserHome = (props) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null
  let message = null
  currentUser ? message =
    <div className="user-home-page-container">
      <h2>Welcome {currentUser.firstName}!</h2>
      <CarIndex />
    </div>
    : message = "Please sign in or register"

  return (
    <>
      {message}
    </>
  )
}

export default UserHome