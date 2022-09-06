import React, { useContext } from "react"
import { myFuckingContext } from "./App"

const UserInfo2 = (props) => {
  const currentUser = useContext(myFuckingContext)

  let userInfo = `You aren't logged in`
  if (currentUser) {
    userInfo = `Current user is: ${currentUser.id}`
  }
  
  return (
    <>
      <h3>This is the second page of user info</h3>
      <p>{userInfo}</p>
      </>
  )
}

export default UserInfo2