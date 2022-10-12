import React, { useState, useContext } from "react"
import CarIndex from "./CarIndex"
import { userContext } from "./App"

const UserHome = (props) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null

  return (
    <div className="user-home-page-container">
      <h1>Welcome {currentUser.firstName}!</h1>   
      <CarIndex />
    </div>
  )

}

export default UserHome