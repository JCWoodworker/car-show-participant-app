import React, { useState } from "react"
import PayPal from "./PayPal"

const CarTile = ({ car, deleteCar, registerCar }) => {
  const [checkout, setCheckout] = useState(false)
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    deleteCar(car)
  }

  let checkoutButton = null
  checkout ? checkoutButton = (
      <PayPal 
        car={car} 
        registerCar={registerCar}
      />
  ) : checkoutButton = (
    <button className="purchase-registration" onClick={() => setCheckout(true)}>
      Purchase 2023 Registration for this car
    </button>
  )

  let checkoutContainer = null
  car.registered ? (
    checkoutContainer = (
      <>
        <p>This car is registered for the show!</p> 
        <p>Your registration number is {car.registered.registrationNumber}</p>
      </>
    )
  ) : (
    checkoutContainer = (
      <>
        {checkoutButton}
      </>  
    )
  )

  return (
    <div className="car-info">
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <button onClick={handleDeleteClick}>Delete This Car</button>
      {checkoutContainer}
    </div>
  )
}

export default CarTile