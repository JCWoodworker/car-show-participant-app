import React, { useContext } from "react"
import { myFuckingContext } from "./App"

const UserInfo2 = (props) => {
  const currentUser = useContext(myFuckingContext)
  return (
    <>
      <h3>This is the second page of user info</h3>
      <p>`User #:{currentUser.id}</p>
    </>
  )
}

export default UserInfo2