import React, { useContext } from "react"
import CarInfo from "./CarInfo"
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
      <CarInfo />
    </>
  )
}

export default UserInfo1