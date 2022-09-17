import React, { useContext } from "react"
import { userContext } from "./App"

const UserInfo2 = (props) => {
  const currentUser = useContext(userContext)

  let userInfo = `----- You aren't logged in -----`
  if (currentUser) {
    userInfo = (
      <div>
        <p>----- Current user is: {currentUser.id}</p>
        <p>----- User name is: {currentUser.firstName}</p>
      </div>
    )
      
  }
  
  return (
    <>
      <p>{userInfo}</p>
      </>
  )
}

export default UserInfo2