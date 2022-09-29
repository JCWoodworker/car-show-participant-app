import React, { useState, useContext } from "react"
import CarIndex from "./CarIndex"
import { userContext } from "./App"
import PayPal from "./PayPal"

const UserHome = (props) => {
  const currentUser = useContext(userContext) ? useContext(userContext) : null

  return (
    <div className="user-home-page-container">
      <h2>Welcome {currentUser.firstName}!</h2>   
      <CarIndex />
    </div>
  )

}

export default UserHome