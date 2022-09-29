import React, { useState } from "react"
import PayPal from "./PayPal"

const CarTile = ({ car, deleteCar, registerCar }) => {
  const [checkout, setCheckout] = useState(false)

  const handleDeleteClick = (event) => {
    event.preventDefault()
    deleteCar(car)
  }

  return (
    <div className="car-info">
      <p>Year: {car.year}</p>
      <p>Make: {car.make}</p>
      <p>Model: {car.model}</p>
      <button onClick={handleDeleteClick}>Delete This Car</button>
      {checkout ? (
        <>
          <PayPal 
            car={car} 
            registerCar={registerCar}
          />
        </>
      ) : (
        <button className="purchase-registration" onClick={() => setCheckout(true)}>
          Purchase 2023 Registration for this car
        </button>
      )}
    </div>
  )
}

export default CarTile