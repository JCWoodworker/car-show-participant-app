import React, { useState } from "react"
import PayPal from "../../PayPal"

const CarTile = ({ car, deleteCar, registerCar }) => {
  const [checkout, setCheckout] = useState(false)
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    deleteCar(car)
  }

  let checkoutButton = null
  checkout ? checkoutButton = (
    <div className="registration-options-container">
      <button 
        className="close-payment-options" 
        onClick={() => setCheckout(!checkout)}>
        Close Payment Options
      </button>
      <PayPal 
        car={car} 
        registerCar={registerCar}
      />
    </div>
  ) : checkoutButton = (
    <button className="purchase-registration" onClick={() => setCheckout(true)}>
      Purchase 2023 Registration for this car
    </button>
  )

  let checkoutContainer = null
  car.registered ? (
    checkoutContainer = (
      <div className="already-registered-car">
        <p>Registered for 2023!</p> 
        <p>Number: {car?.registered?.registrationNumber}</p>
      </div>
    )
  ) : (
    checkoutContainer = (
      <>
        {checkoutButton}
      </>  
    )
  )

  let deleteButton = null
  car.registered ? (
    deleteButton = null
  ) : (
    deleteButton = (
      <button className="delete-car" onClick={handleDeleteClick}>
        Delete Car
      </button>
    )
  )

  let yearMakeModel = (
      <>
        <p className="year-make-model">{car?.year} {car?.make} {car?.model}</p>
      </>
    )

  return (
    <div className="car-info">
      {yearMakeModel}
      {checkoutContainer}
      {deleteButton}
    </div>
  )
}

export default CarTile