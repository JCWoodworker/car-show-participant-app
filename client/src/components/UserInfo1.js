import React, { useContext } from "react"
import UserInfo2 from "./UserInfo2"
import { userContext } from "./App"

const UserInfo1 = (props) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null
  let message = null
  currentUser ? message = 
    <h3>Welcome back {currentUser.firstName}!</h3> 
    : message = "Please sign in or register"

  return (
    <>
      {message}
      <UserInfo2 />
    </>
  )
}

export default UserInfo1