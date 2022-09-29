import React, { useState, useContext } from "react"
import CarIndex from "./CarIndex"
import { userContext } from "./App"
import PayPal from "./PayPal"

const UserHome = (props) => {
  const [checkout, setCheckout] = useState(false)
  const currentUser = useContext(userContext) ? useContext(userContext) : null

  return (
    <div className="user-home-page-container">
      {checkout ? (
        <>
          <h2>Choose your payment method:</h2>
          <PayPal />
        </>
      ) : (
        <>
          <h2>Welcome {currentUser.firstName}!</h2>
          <button className="purchase-registration" onClick={() => setCheckout(true)}>
            Purchase A Registration for 2023
          </button>
          <CarIndex />
        </>
      )}
    </div>
  )

}

export default UserHome