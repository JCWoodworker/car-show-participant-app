import React, { useContext } from "react"
import { userContext } from "./App"

const CarInfo = (props) => {
  const currentUser = useContext(userContext)

  let carInfo = `----- You aren't logged in -----`
  if (currentUser) {
    carInfo = (
      <div>
        <p>----- Current user is: {currentUser.id}</p>
        <p>----- User name is: {currentUser.firstName}</p>
      </div>
    )
      
  }
  
  return (
    <>
      <p>{carInfo}</p>
      </>
  )
}

export default CarInfo